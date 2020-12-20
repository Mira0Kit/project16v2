import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Mworker, MworkerTypeRu } from 'src/app/shared/models/mworker.model';
import { WorkerService } from 'src/app/shared/services/worker.service';



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
  sId = "-";
  sBirth = "-";
  flag = true;
 

  constructor(private workerService: WorkerService, private router: Router) {
     this.today = new Date(); 
    }

  ngOnInit(): void {
    this.getData();
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


  // countWorkerYears(birthdate: string) {
  //   let birth = moment(birthdate, "DD.MM.YYYY");
  //   return moment().diff(birth, "years");
  // }

  sortId() {
    this.flag = true;

    if (this.sBirth !== '-')
      this.sBirth = "-";

    switch (this.sId) {
      case '-':
        this.sId = '↓'
        break;
      case '↓':
        this.sId = '↑'
        break;
      case '↑':
        this.sId = '-'
        break;
    }
  }

  sortBirth() {
    this.flag = false;

    if (this.sId !== '-')
      this.sId = "-";

    switch (this.sBirth) {
      case '-':
        this.sBirth = '↓'
        break;
      case '↓':
        this.sBirth = '↑'
        break;
      case '↑':
        this.sBirth = '-'
        break;
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
