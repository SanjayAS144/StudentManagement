import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnnouncementService } from 'src/app/Service/common/announcement.service';
import { Announcement } from 'src/app/modal/announcement';

@Component({
  selector: 'app-event-viewer',
  templateUrl: './event-viewer.component.html',
  styleUrls: ['./event-viewer.component.css']
})
export class EventViewerComponent implements OnInit{

  eventList:Observable<Announcement[]> |undefined
  Caller:string |undefined

  constructor(private eventService:AnnouncementService,private router: Router){
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state)
      this.Caller = state['from']
    console.log(this.Caller)
  }

  ngOnInit(): void {
    if(this.Caller == "Teacher"){
      this.eventList = this.eventService.getAllAnnouncementForTeacher()
    }else{
      this.eventList = this.eventService.getAllAnnouncement()
    }
  }

}
