import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingTasksPageRoutingModule } from './pending-tasks-routing.module';

import { PendingTasksPage } from './pending-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingTasksPageRoutingModule
  ],
  declarations: [PendingTasksPage]
})
export class PendingTasksPageModule {}
