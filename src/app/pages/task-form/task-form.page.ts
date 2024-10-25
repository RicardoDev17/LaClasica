import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage {
  @ViewChild('taskForm', { static: false }) taskForm!: NgForm; // Paso 2
  taskTitle: string = '';
  taskDescription: string = '';
  dueDate: string= '';
  alarmTime: string= '';

  constructor(private storage: Storage, private navCtrl: NavController,  private router: Router) {}

  async ngOnInit() {
    await this.storage.create(); // Crea la base de datos en la inicialización
  }

  async addTask(form: NgForm) {
    if (form.valid) {
      const newTask = {
        title: this.taskTitle,
        description: this.taskDescription,
        dueDate: this.dueDate,
        alarmTime: this.alarmTime,
      };

      await this.storage.set(`task_${Date.now()}`, newTask);

      // Obtener las tareas existentes
      const tasks = (await this.storage.get('tasks')) || [];

      // Agregar la nueva tarea
      tasks.push(newTask);

      // Guardar las tareas actualizadas
      await this.storage.set('tasks', tasks);
      
      // Regresar a la página anterior
      this.navCtrl.back();
    }
  }
  goToTaskList() {
    this.router.navigate(['/task-list']); // Cambia a la ruta de registro
  }
}
