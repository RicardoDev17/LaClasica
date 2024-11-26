import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.page.html',
  styleUrls: ['./pending-tasks.page.scss'],
})
export class PendingTasksPage implements OnInit {
  tasks: any[] = [];
  advice: string = ''; // Añadimos la propiedad para el consejo

  constructor(private router: Router, private http: HttpClient) {}

  async ngOnInit() {
    await this.loadTasks();
    this.loadAdvice(); // Cargar el consejo al iniciar la página
  }

  async loadTasks() {
    const user = await this.getCurrentUser();

    if (!user) {
      alert('No se encontró un usuario logueado.');
      this.router.navigate(['/login']);
      return;
    }

    const userEmail = user.email;
    const { value } = await Storage.get({ key: `tasks_${userEmail}` });
    this.tasks = value ? JSON.parse(value) : [];
  }

  loadAdvice() {
    const adviceUrl = 'https://api.adviceslip.com/advice'; // URL de la API de consejos
    this.http.get(adviceUrl).subscribe(
      (response: any) => {
        this.advice = response.slip.advice; // Asignar el consejo a la propiedad
      },
      (error) => {
        console.error('Error al cargar el consejo:', error);
      }
    );
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

    await Storage.set({ key: `tasks_${userEmail}`, value: JSON.stringify(this.tasks) });
    alert('Tarea actualizada exitosamente.');
    await this.loadTasks();
  }

  async deleteTask(index: number) {
    const user = await this.getCurrentUser();
    if (!user) return;

    const userEmail = user.email;
    this.tasks.splice(index, 1);

    await Storage.set({ key: `tasks_${userEmail}`, value: JSON.stringify(this.tasks) });
    alert('Tarea eliminada.');
    await this.loadTasks();
  }

  async logout() {
    await Storage.remove({ key: 'user' });
    this.router.navigate(['/login']);
    alert('Has cerrado sesión.');
  }

  private async getCurrentUser() {
    const { value } = await Storage.get({ key: 'user' });
    return value ? JSON.parse(value) : null;
  }
}
