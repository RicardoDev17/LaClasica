import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.page.html',
  styleUrls: ['./pending-tasks.page.scss'],
})
export class PendingTasksPage implements OnInit {
  tasks: any[] = [];
  advice: string | null = null; // Agrega la propiedad advice

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.loadTasks();
    await this.loadAdvice(); // Carga el consejo al iniciar
  }

  async loadTasks() {
    const user = await this.getCurrentUser();

    if (!user) {
      alert('No se encontró un usuario logueado.');
      this.router.navigate(['/login']);
      return;
    }

    const userEmail = user.email;
    const { value } = await Preferences.get({ key: `tasks_${userEmail}` });
    this.tasks = value ? JSON.parse(value) : [];
  }

  async loadAdvice() {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      this.advice = data.slip.advice; // Almacena el consejo
    } catch (error) {
      console.error('Error al cargar el consejo:', error);
    }
  }

  async editTask(index: number) {
    const user = await this.getCurrentUser();
    if (!user) return;

    const userEmail = user.email;
    const task = this.tasks[index];

    const newTitle = prompt('Edita el título de la tarea:', task.title);
    const newDescription = prompt('Edita la descripción de la tarea:', task.description);
    const newDueDate = prompt('Edita la fecha límite (YYYY-MM-DD):', task.dueDate);

    if (newTitle !== null) task.title = newTitle;
    if (newDescription !== null) task.description = newDescription;
    if (newDueDate !== null) task.dueDate = new Date(newDueDate).toISOString();

    await Preferences.set({ key: `tasks_${userEmail}`, value: JSON.stringify(this.tasks) });
    alert('Tarea actualizada exitosamente.');
    await this.loadTasks();
  }

  async deleteTask(index: number) {
    const user = await this.getCurrentUser();
    if (!user) return;

    const userEmail = user.email;
    this.tasks.splice(index, 1);

    await Preferences.set({ key: `tasks_${userEmail}`, value: JSON.stringify(this.tasks) });
    alert('Tarea eliminada.');
    await this.loadTasks();
  }

  async logout() {
    await Preferences.remove({ key: 'user' });
    this.router.navigate(['/login']);
    alert('Has cerrado sesión.');
  }

  private async getCurrentUser() {
    const { value } = await Preferences.get({ key: 'user' });
    return value ? JSON.parse(value) : null;
  }
}
