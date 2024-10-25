import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  tasks: any[] = [];

  constructor(private storage: Storage, private router: Router) {}

  async ngOnInit() {
    await this.storage.create(); // Inicializar la base de datos
    await this.loadTasks(); // Cargar tareas al iniciar la página
  }

  async loadTasks() {
    const keys = await this.storage.keys(); // Obtener todas las claves
    this.tasks = await Promise.all(keys.map(async (key) => {
      const task = await this.storage.get(key);
      return {
        id: key,
        ...task, // Incluye todos los datos de la tarea
      };
    }));
  }

  async deleteTask(taskId: string) {
    await this.storage.remove(taskId); // Eliminar la tarea usando su ID
    await this.loadTasks(); // Volver a cargar las tareas
  }

  goToTaskForm() {
    this.router.navigate(['/task-form']); // Cambia a la ruta de registro
  }
}
