import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingTasksPage } from './pending-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: PendingTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingTasksPageRoutingModule {}
