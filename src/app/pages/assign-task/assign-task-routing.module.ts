import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignTaskPage } from './assign-task.page';

const routes: Routes = [
  {
    path: '',
    component: AssignTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignTaskPageRoutingModule {}
