import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  tasks: any[] = [];

  constructor(private storage: Storage, private router: Router) {}

  async ngOnInit() {
    await this.storage.create();
    await this.loadTasks();
  }

  async loadTasks() {
    const keys = await this.storage.keys();
    this.tasks = await Promise.all(keys.map(async (key) => {
      const task = await this.storage.get(key);
      return {
        id: key,
        ...task,
      };
    }));
  }

  async deleteTask(taskId: string) {
    await this.storage.remove(taskId);
    await this.loadTasks();
  }

  goToTaskForm() {
    this.router.navigate(['/task-form']);
  }
}
