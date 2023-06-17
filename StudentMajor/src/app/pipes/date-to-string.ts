import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'dateToString',
})
export class DateToStringPipe implements PipeTransform {
  constructor() {}

  transform(date: any): string {
    let eventDate: Date =  date.toDate()
    var datePipe = new DatePipe("en-US");
    let res = datePipe.transform(eventDate, 'dd/MM/yyyy')
    return res??"";
  }
}