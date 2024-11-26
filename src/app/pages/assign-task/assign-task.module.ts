import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignTaskPageRoutingModule } from './assign-task-routing.module';

import { AssignTaskPage } from './assign-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignTaskPageRoutingModule
  ],
  declarations: [AssignTaskPage]
})
export class AssignTaskPageModule {}
