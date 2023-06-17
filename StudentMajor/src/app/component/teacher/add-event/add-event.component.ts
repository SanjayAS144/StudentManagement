import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AnnouncementService } from 'src/app/Service/common/announcement.service';
import { UsersService } from 'src/app/Service/users.service';
import { Announcement } from 'src/app/modal/announcement';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent  implements OnInit{
  selectedFiles?: FileList;
  dateVariable:string = ''
  eventName:string=''
  eventDescription:string = ''
  currentUserId:string | undefined | null
  currentUserRole:string | null = ''
  percentage = 0;
  eventDate:Date | undefined

  constructor(private userService:UsersService,private announcementService:AnnouncementService,private ngxLoader:NgxUiLoaderService,private ToastrService: ToastrService){
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("UserId")
  }

  async OnResetedForm(){
    console.log("start reseting")
    this.selectedFiles = undefined
    this.eventName = ""
    this.eventDescription = ""
    this.dateVariable = ""
    console.log("end reseting")
  }

  OnAdded(){
    this.ngxLoader.start()
    this.eventDate = new Date(this.dateVariable)
    if(this.eventName == "" || this.eventDescription == "" || this.dateVariable == ""){
      this.ngxLoader.stop()
      alert("Fill all the fields")
      return;
    }
    const eventObject : Announcement = {
      SenderUid : this.currentUserId!=null? this.currentUserId : "",
      SenderRole: "Teacher",
      EventName :  this.eventName,
      EventDescription :  this.eventDescription,
      Attachements :  "",
      EventDate:this.eventDate,
      
    }

    const file : File | null | undefined = this.selectedFiles?.item(0)
    if(file){
      this.announcementService.pushFileToStorage(file,eventObject)?.subscribe((progress:number | undefined)=>{
        this.percentage = Math.round(progress? progress:0)
        if(this.percentage == 100){
          this.OnResetedForm()
          this.ngxLoader.stop()
          this.ToastrService.success("Successfully added the Event")
        }
      },err=>{
        this.OnResetedForm()
        this.ngxLoader.stop()
        this.ToastrService.error("Unable to Update the Event Details")
      })
    }else{
      this.OnResetedForm()
      this.announcementService.addAnnouncement(eventObject)
      this.ngxLoader.stop()
      this.ToastrService.success("Successfully added the Event")
    }
    console.log(this.dateVariable)
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

}
