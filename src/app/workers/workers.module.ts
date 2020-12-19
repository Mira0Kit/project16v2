import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersComponent } from './workers.component';
import { WorkerListComponent } from './worker-list/worker-list.component';
import { WorkerEditComponent } from './worker-edit/worker-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { WorkerFilterPipe } from '../shared/pipes/worker-filter.pipe';
import { MomentModule } from 'ngx-moment';


@NgModule({
  declarations: [
    WorkersComponent,
    WorkerListComponent,
    WorkerEditComponent,
    WorkerFilterPipe
  ],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    FormsModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    })
  ]
})
export class WorkersModule { }
