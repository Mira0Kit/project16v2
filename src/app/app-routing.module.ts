import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'information',
    component: InfoComponent
  },
  {
    path: 'workers',
    loadChildren: () =>
    import('./workers/workers.module').then(m => m.WorkersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
