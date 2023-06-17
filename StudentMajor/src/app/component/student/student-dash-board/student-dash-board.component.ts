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
import { Router } from '@angular/router';
import { AnnouncementService } from 'src/app/Service/common/announcement.service';
import { Announcement } from 'src/app/modal/announcement';
import { Results } from 'src/app/modal/results';
import { AddResultService } from 'src/app/Service/Teacher/add-result.service';

@Component({
  selector: 'app-student-dash-board',
  templateUrl: './student-dash-board.component.html',
  styleUrls: ['./student-dash-board.component.css'],
})
export class StudentDashBoardComponent implements OnInit{
  defaultImage = "https://mdbootstrap.com/img/new/avatars/8.jpg"
  modalRef: MdbModalRef<SelectProctorModalComponent> | null = null;
  colorList = ['#CEDBF2','#E7E9EC','#F6D2D8']
  headers = ['Name', 'Age', 'Department', 'Phone', 'gender',];
  teacherList:Teacher[] | undefined;
  studentList:Student[] | undefined;
  selectedRow:Teacher | undefined
  studentData:Student | undefined;
  numberOfStudents:number = 0;
  numberOfTeachers:number = 0;
  eventList:Announcement[]|undefined
  resultList:Results[]|undefined
  teacherName:string|undefined
  teacherAge:string|undefined
  teacherEmail:string|undefined
  teacherNumber:string|undefined
  teacherGender:string|undefined
  teacherDepartment:string|undefined
  currentUserId:string|undefined|null = ""
  constructor(
    private studentDataService:ReadDataService,
    private ngxLoader:NgxUiLoaderService,
    private auth:AuthService,
    private modalService: MdbModalService,
    private common:CommonService,
    private userService:UsersService,
    private studentService:AddStudentServiceService,
    private router:Router,
    private eventService:AnnouncementService,
    private resultService:AddResultService){}
  
  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("UserId")
    this.ngxLoader.start()
    this.userService.getCurrentUserdetails(this.common.roleData,this.common.userId).subscribe((user:Student)=>{
      this.studentData = user;
      console.log(this.studentData)
      if(this.studentData.proctorID == undefined || this.studentData.proctorID == ''){
        console.log("I am A aproctor less student")
        this.studentDataService.getAllTeacherOfCurentBranch(this.studentData.department).subscribe((data)=>{
          this.teacherList = data
          this.numberOfTeachers = this.teacherList.length
          this.ngxLoader.stop()
          this.open()   
        })
      }
      else{ 
        this.getTeacherDetails();
        this.ngxLoader.stop()
      }
    })
    this.eventService.getTopThreeEvents().subscribe((events)=>{
      if(events.length > 3){
        this.eventList = events.slice(0,3)
      }else{
        this.eventList = events
      }
    })
    this.resultService.getResults(this.currentUserId??"").subscribe((results)=>{
      console.log(results)
      if(results.length > 3){
        this.resultList = results.slice(0,3)
      }else{
        this.resultList = results
      }
    })
  }
  
  OnUserLogout(){
    this.auth.logout()
  }

  open(){
    this.modalRef = this.modalService.open(SelectProctorModalComponent,{
      ignoreBackdropClick: true,
      keyboard: false,
      data:{ teacherList: this.teacherList }
    })

    this.modalRef.onClose.subscribe((teacher:Teacher)=>{
      //update the Teacher and student both 
      this.ngxLoader.start()
      this.populateTacherDetailst(teacher)
      if(this.studentData)
        this.studentService.updateStudentDetails(teacher.uid,this.studentData).then(()=>{
          this.ngxLoader.stop()
        },err=>{
          this.ngxLoader.stop()
          alert("Unable to update the user Details"+ err.message)
        })
    })
  }

  onRowSelect(teacher:Teacher){
    console.log(teacher.email)
    this.selectedRow = teacher
    
  }

  addNewAnnouncement(){
    console.log("I am adding new Announcement")
    this.router.navigate(["viewEvents"],{state:{from:"Student"}})
    console.log("I am adding new Announcement done")
  }

  onResultViewClick(){
    this.router.navigate(["viewResults"])
  }
  
  getTeacherDetails(){
    if(this.studentData){
    this.userService.getCurrentTeacherDetails("Teacher",this.studentData.proctorID).subscribe((selectedTeacher:Teacher)=>{
      this.populateTacherDetailst(selectedTeacher)
    });}
  }

  populateTacherDetailst(selectedTeacher:Teacher){
    this.teacherName = selectedTeacher? selectedTeacher.first_name + selectedTeacher.last_name : undefined;
      this.teacherAge = selectedTeacher?selectedTeacher.age : undefined
      this.teacherEmail = selectedTeacher?selectedTeacher.email : undefined
      this.teacherNumber = selectedTeacher?selectedTeacher.phone_number : undefined
      this.teacherGender = selectedTeacher?selectedTeacher.gender : undefined
      this.teacherDepartment = selectedTeacher?selectedTeacher.department : undefined
  }
}
