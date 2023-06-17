import { Component, OnInit } from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader'
import { Observable, map, tap } from 'rxjs';
import { ReadDataService } from 'src/app/Service/adminServices/read-data.service';
import { Student } from 'src/app/modal/student';
import { Teacher } from 'src/app/modal/teacher';
import { AuthService } from 'src/app/shared/auth.service';
import { SelectProctorModalComponent } from '../../modal/select-proctor-modal/select-proctor-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CommonService } from 'src/app/Service/common.service';
import { UsersService } from 'src/app/Service/users.service';
import { AddStudentServiceService } from 'src/app/Service/Student/add-student-service.service';
import { TeacherServiceService } from 'src/app/Service/Teacher/teacher-service.service';
import { Router } from '@angular/router';
import { AnnouncementService } from 'src/app/Service/common/announcement.service';
import { Announcement } from 'src/app/modal/announcement';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit{
  defaultImage = "https://mdbootstrap.com/img/new/avatars/8.jpg"
  modalRef: MdbModalRef<SelectProctorModalComponent> | null = null;
  
  headers = ['Name', 'Age', 'Department', 'Phone', 'gender'," "];
  teacherList:Teacher[] | undefined;
  studentList:Student[] | undefined;
  selectedRow:Teacher | undefined
  studentData:Student | undefined;
  numberOfStudents:number = 0;
  numberOfTeachers:number = 0;
  numberOfEvents= 0;
  constructor(
    private studentDataService:ReadDataService,
    private ngxLoader:NgxUiLoaderService,
    private auth:AuthService,
    private modalService: MdbModalService,
    private common:CommonService,
    private userService:UsersService,
    private studentService:AddStudentServiceService,
    private teacherService:TeacherServiceService,
    private router:Router,
    private eventService:AnnouncementService){}
  
  ngOnInit(): void {
    this.ngxLoader.start()
    this.teacherService.GetStudentListOfCurrentProctor(this.common.userId).subscribe((studentList:Student[])=>{
      this.studentList = studentList;
      this.ngxLoader.stop();
    })
    this.ngxLoader.start()
    this.eventService.getAllAnnouncementForTeacher().subscribe((events:Announcement[])=>{
      this.numberOfEvents = events.length
      this.ngxLoader.stop();
    })
  }

  OnUserLogout(){
    this.auth.logout()
  }
  
  onRowSelect(teacher:Teacher){
    console.log(teacher.email)
    this.selectedRow = teacher
    
  }

  addNewAnnouncement(){
    console.log("I am adding new Announcement")
    this.router.navigate(["viewEvents"],{state:{from:"Teacher"}})
    console.log("I am adding new Announcement done")
  }

  onAddresults(student:Student){
    this.router.navigate(["addResults"],{state:{studentDetails:student}})
  }
  
}
