import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Mworker, MworkerType } from 'src/app/shared/models/mworker.model';
import { WorkerService } from 'src/app/shared/services/worker.service';

@Component({
  selector: 'app-worker-edit',
  templateUrl: './worker-edit.component.html',
  styleUrls: ['./worker-edit.component.css']
})
export class WorkerEditComponent implements OnInit {
  id: number;
  worker: Mworker;
  workerForm: FormGroup;
  mworkerType = MworkerType;

  public numMask = ['+', '7', '(',/[1-9]/, /\d/, /\d/,')', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/];
  public birthMask = [ /\d/, /\d/,'.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

  constructor(private activatedRoute: ActivatedRoute, private workerService: WorkerService, private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id !== null && params.id !== undefined) {
        this.id = params.id;
      }
      else {
        this.id = null;
      }
    })
  }

  ngOnInit(): void {
    this.workerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      patronymic: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.pattern(/^[+,0-9,(,),-]+$/), Validators.required]),
      //email: new FormControl(null, [Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/), Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      birthdate: new FormControl(null, [Validators.required, this.birthdateValidator]),
      type: new FormControl(0, [Validators.required])
    });
    this.getData();
  }

  birthdateValidator(control: FormControl): { [s: string]: boolean } {
    //if (!isNaN(Date.parse(control.value))) { недопустимые даты
    return moment(String(control.value), 'DD-MM-YYYY').isBefore(moment.now()) ? null : {"birthdate": true}
  }

  async getData() {
    if ((this.id != null) && (this.id != undefined)) {
      try {
        let worker = this.workerService.getOneById(this.id);
        this.worker = await worker;
      }
      catch (err) {
        console.error(err);
      }
      this.workerForm.patchValue({
        name: this.worker.name,
        surname: this.worker.surname,
        patronymic: this.worker.patronymic,
        number: this.worker.number,
        email: this.worker.email,
        birthdate: this.worker.birthdate,
        type: this.worker.type
      });
    }
  }

  async onDelete() {
    try {
      await this.workerService.deleteOneById(this.id);
    }
    catch (err) {
      console.error(err);
    }
    this.router.navigate(['/workers']);
  }

  async onSave() {
    if (this.id !== null && this.id !== undefined) {
      try {
        await this.workerService.putOneById(this.id, this.workerForm.value);
      }
      catch (err) {
        console.error(err);
      }
    }
    else {
      try {
        let res = await this.workerService.postOne(this.workerForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      }
      catch (err) {
        console.error(err);
      }
    }
  }
}