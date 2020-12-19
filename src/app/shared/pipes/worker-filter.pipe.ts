import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workerFilter'
})

export class WorkerFilterPipe implements PipeTransform {

  transform(workers: any[], searchStr: string): any[] {
    if (searchStr === '' || workers.length === 0) {
      return workers;
    }
    else {
      let filteredWorkers = workers.filter(
        (worker => {
          let filt = [worker.name, worker.surname, (worker.name + " " + worker.surname), (worker.surname + " " + worker.name)];
          return filt.some((item) => item.toLowerCase().startsWith(searchStr.toLowerCase()));
        }));
      return filteredWorkers;
    }
  }
}
