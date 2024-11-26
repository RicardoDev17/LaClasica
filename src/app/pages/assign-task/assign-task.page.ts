import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.page.html',
  styleUrls: ['./assign-task.page.scss'],
})
export class AssignTaskPage {
  task = {
    title: '',
    description: '',
    dueDate: ''
  };

  constructor(private router: Router) {}

  async onSubmit() {
    const user = await this.getCurrentUser();

    if (!user) {
      alert('No se encontró un usuario logueado.');
      this.router.navigate(['/login']);
      return;
    }

    const userEmail = user.email; // Usa el correo del usuario como clave única
    const { value } = await Storage.get({ key: `tasks_${userEmail}` });
    const tasks = value ? JSON.parse(value) : [];

    // Convertir la fecha límite a formato ISO
    this.task.dueDate = new Date(this.task.dueDate).toISOString();

    // Agregar la nueva tarea
    tasks.push(this.task);

    // Guardar las tareas en el almacenamiento
    await Storage.set({ key: `tasks_${userEmail}`, value: JSON.stringify(tasks) });

    alert('Tarea guardada con éxito.');
    this.router.navigate(['/pending-tasks']); // Redirigir a la página de tareas pendientes
  }

  async logout() {
    await Storage.remove({ key: 'user' }); // Eliminar la sesión del usuario
    this.router.navigate(['/login']); // Redirigir al login
    alert('Has cerrado sesión.');
  }

  private async getCurrentUser() {
    const { value } = await Storage.get({ key: 'user' });
    return value ? JSON.parse(value) : null;
  }
}
