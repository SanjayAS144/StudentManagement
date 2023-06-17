import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader'
import { Observable, map, tap } from 'rxjs';
import { ReadDataService } from 'src/app/Service/adminServices/read-data.service';
import { AnnouncementService } from 'src/app/Service/common/announcement.service';
import { Announcement } from 'src/app/modal/announcement';
import { Student } from 'src/app/modal/student';
import { Teacher } from 'src/app/modal/teacher';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  headers = ['Name', 'Age', 'Department', 'Phone', 'gender',];
  defaultImage = "https://mdbootstrap.com/img/new/avatars/8.jpg"
  studentList:Student[] | undefined;
  teacherList:Teacher[] | undefined;
  numberOfStudents:number = 0;
  numberOfTeachers:number = 0;
  numberOfEvents = 0;
  constructor(private studentDataService:ReadDataService,private ngxLoader:NgxUiLoaderService,private auth:AuthService,private router:Router,private eventService:AnnouncementService){}
  ngOnInit(): void {
    this.ngxLoader.start()
    this.studentDataService.getAllStudents().subscribe((data)=>{
      this.studentList = data
      this.numberOfStudents = this.studentList.length
      this.ngxLoader.stop()
    })
    this.ngxLoader.start()
    this.studentDataService.getAllTeachers().subscribe((data)=>{
      this.teacherList = data
      this.numberOfTeachers = this.teacherList.length
      this.ngxLoader.stop()
    })
    this.eventService.getAllAnnouncement().subscribe((announcements:Announcement[])=>{
      this.numberOfEvents = announcements.length
    })
  }
  OnUserLogout(){
    this.auth.logout()
  }

  addNewAnnouncement(){
    console.log("I am adding new Announcement")
    this.router.navigate(["viewEvents"],{state:{from:"Admin"}})
    console.log("I am adding new Announcement done")
  }
}