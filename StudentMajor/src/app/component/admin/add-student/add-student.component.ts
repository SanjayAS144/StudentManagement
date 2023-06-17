import { Component, OnInit } from '@angular/core';
import { AddStudentServiceService } from 'src/app/Service/Student/add-student-service.service';
import { Student} from 'src/app/modal/student';
import {NgxUiLoaderService} from 'ngx-ui-loader'
import { delay } from 'rxjs';
import { TosterService } from 'src/app/Service/toster-service.service';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit{
  studentsList: Student[] = [];
  departmentList:string[] = ['Department','ECE','CSE','ISE','ME','CE','ETE'];
  studentObj: Student = {
    uid: '',
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    phone_number: '',
    gender: '',
    image: '',
    department: '',
    role:'Student',
    proctorID:''
  };
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  age: string = '';
  email: string = '';
  phone_number: string = '';
  gender: string = '';
  image: string = '';
  proffesion: string = '';
  location: string = '';
  mark: string = '';
  department: string =this.departmentList[0];

  constructor(private addStudentService:AddStudentServiceService,private ngxLoader:NgxUiLoaderService,private toastr: TosterService,private auth:AuthService){
    
  }

  OnShowAddedStudentSuccess() {
    this.toastr.showStudentAddSucces();
  }

  OnShowAddedStudentWarning() {
    this.toastr.showAddStudentWarning();
  }

  ngOnInit(): void {
    
  }

  OnUserLogout() {
    this.auth.logout();
  }

  OnResetedForm(){
    this.first_name = '',
    this.last_name = '',
    this.age = '',
    this.email = '',
    this.phone_number = ''
    this.gender = ''
    this.department = this.departmentList[0]
  }

  onselect(gender:string){
    console.log(gender)
  }

  async OnAddedStudent() {
    console.log("Add Student called")
    this.ngxLoader.start()
 
    if (this.first_name == '' || this.last_name == '' || this.age == '' || this.email == '' || this.phone_number == '' || this.gender == '' || this.department == this.departmentList[0]) {
      this.ngxLoader.stop()
      this.OnShowAddedStudentWarning();
      return;
    }
    this.studentObj.uid = '';
    this.studentObj.first_name = this.first_name;
    this.studentObj.last_name = this.last_name;
    this.studentObj.age = this.age;
    this.studentObj.email = this.email;
    this.studentObj.phone_number = this.phone_number;
    this.studentObj.gender = this.gender;
    this.studentObj.department = this.department
    this.studentObj.role = 'Student'
    console.log(this.studentObj)
    this.addStudentService.RegisterStudent(this.studentObj).then((user)=>{
      if(user.user?.uid != null || user.user?.uid != undefined){
        this.studentObj.uid = user.user.uid;
        this.addStudentService.AddStudentDetails(this.studentObj).then(()=>{
          this.addStudentService.logOutSecondaryAndLogInPrimary()?.then((user)=>{
            this.addStudentService.SendMail(this.studentObj).subscribe((resp)=>{
              console.log(resp)
              this.OnShowAddedStudentSuccess();
              this.OnResetedForm();
              if(user.user?.uid != undefined){
                console.log("89088888888888888888888888888888888888888888888888888888888888888888888888")
              }
              this.ngxLoader.stop()
            },err=>{
              console.log("failed to send the mail")
              this.ngxLoader.stop()
            })
          },err=>{
            console.log(err)
            this.ngxLoader.stop()
          })
        });
      }
    },err=>{
      console.log(err)
      this.ngxLoader.stop()
      this.OnShowAddedStudentWarning();
    })
  }
}