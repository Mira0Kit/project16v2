import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkerEditComponent } from './worker-edit/worker-edit.component';
import { WorkerListComponent } from './worker-list/worker-list.component';
import { WorkersComponent } from './workers.component';


const routes: Routes = [
  {
    path: '',
    component: WorkersComponent,
    children: [
      {
        path: '',
        component: WorkerListComponent
      },
      {
        path: 'profile',
        component: WorkerEditComponent
      },
      {
        path: 'profile/:id',
        component: WorkerEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule { }
