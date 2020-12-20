import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(workers: any[], sId: string, sBirth: string, flag: boolean): any[] {

    if (workers == undefined || workers.length === 0) {
      return workers;
    }
    else {
      if (flag)
        switch (sId) {
          case '↓':
            workers.sort((a, b) => a.id - b.id);
            break;
          case '↑':
            workers.reverse();
            break;
        }
      if (!flag) {
        if (sBirth == '↓') {
          workers.sort((a, b)  => {
            let ma = moment(a.birthdate, 'DD.MM.YYYY');
            let mb = moment(b.birthdate, 'DD.MM.YYYY');
            return mb.diff(ma, "years", true);
          })
        }
        else if (sBirth == '↑') {
          workers.reverse();
        }
      }
      return workers;
    }
  }
}
