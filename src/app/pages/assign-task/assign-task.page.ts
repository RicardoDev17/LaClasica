import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.page.html',
  styleUrls: ['./assign-task.page.scss'],
})
export class AssignTaskPage {
  task = {
    title: '',
    description: '',
    dueDate: '',
  };

  constructor(private router: Router) {}

  async onSubmit() {
    const user = await this.getCurrentUser();
    if (!user) {
      alert('No se encontró un usuario logueado.');
      return;
    }

    // Obtén el correo del usuario actual
    const userEmail = user.email;
    const { value } = await Preferences.get({ key: `tasks_${userEmail}` });
    const tasks = value ? JSON.parse(value) : [];

    // Formatea la fecha correctamente antes de guardar
    this.task.dueDate = new Date(this.task.dueDate).toISOString();

    // Agrega la nueva tarea
    tasks.push(this.task);

    // Guarda las tareas actualizadas en el almacenamiento
    await Preferences.set({ key: `tasks_${userEmail}`, value: JSON.stringify(tasks) });

    // Programar la notificación para esta tarea
    await this.scheduleNotification(this.task.title, new Date(this.task.dueDate));

    alert('Tarea guardada con éxito.');
    this.router.navigate(['/pending-tasks']); // Redirige a la página de tareas pendientes
  }

  async logout() {
    await Preferences.remove({ key: 'user' }); // Elimina al usuario logueado
    this.router.navigate(['/login']); // Redirige al login
    alert('Has cerrado sesión.');
  }

  private async getCurrentUser() {
    const { value } = await Preferences.get({ key: 'user' });
    return value ? JSON.parse(value) : null;
  }

  private async scheduleNotification(taskTitle: string, taskDate: Date) {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: new Date().getTime(), // Genera un ID único
          title: 'Recordatorio de tarea',
          body: `No olvides: ${taskTitle}`,
          schedule: {
            at: taskDate, // Programa la notificación para la fecha y hora de la tarea
          },
          sound: 'default', // Opcional: usa un sonido predeterminado
        },
      ],
    });
  }
}
