import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mworker, MworkerTypeRu } from 'src/app/shared/models/mworker.model';
import { WorkerService } from 'src/app/shared/services/worker.service';
import * as Tablesort from 'tablesort'


@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css',
]
})
export class WorkerListComponent implements OnInit {
  title: string;
  workers: Mworker[];
  workerType: WorkerType;
  ruWorkerType = MworkerTypeRu;
  searchStr = "";
  today: Date;

  constructor(private workerService: WorkerService, private router: Router) {
     this.today = new Date(); 
    }

  ngOnInit(): void {
    this.getData();
    new Tablesort(document.getElementById('table-id'));
  }

  async getData() {
    try {
      let workers = this.workerService.getAll();
      this.workers = ((await workers) == null || (await workers) == undefined) ? [] : await workers;
    }
    catch(err) {
      console.error(err);
    }
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  async onDelete(id: number) {
    try {
      await this.workerService.deleteOneById(id);
    }
    catch (err) {
      console.error(err);
    }
    this.getData();
    //sort.refresh();
  }
}
