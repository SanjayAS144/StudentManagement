import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'eventStatus',
})
export class EventStatusPipe implements PipeTransform {
  constructor() {}

  transform(date: any): Boolean {
    let eventDate: Date =  date.toDate()
    let currentDate: Date = new Date()
    if(eventDate.getTime() > currentDate.getTime()){
        return true;
    }else{
        return false;
    }
  }
}