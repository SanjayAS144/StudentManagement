import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AddTeacherServiceService } from 'src/app/Service/adminServices/add-teacher-service.service';
import { TosterService } from 'src/app/Service/toster-service.service';
import { Student} from 'src/app/modal/student';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Teacher } from 'src/app/modal/teacher';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent {
  departmentList:string[] = ['Department','ECE','CSE','ISE','ME','CE','ETE'];
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
  teacherObj: Teacher = {
    uid: '',
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    phone_number: '',
    gender: '',
    image: '',
    department: '',
    role:'Teacher',
    studentList:[]
  };
  

  constructor(private addTeacherService:AddTeacherServiceService,private ngxLoader:NgxUiLoaderService,private toastr: TosterService,private firebaseAuth:AngularFireAuth,private auth:AuthService){
  }

  OnShowAddedStudentSuccess() {
    this.toastr.showTeacherAddSuccess();
  }

  OnShowAddedStudentWarning() {
    this.toastr.showAddStudentWarning();
  }

  ngOnInit(): void {
  }

  OnUserLogout() {
    this.auth.logout();
  }

  async OnResetedForm(){
    console.log("start reseting")
    this.first_name = '',
    this.last_name = '',
    this.age = '',
    this.email = '',
    this.phone_number = ''
    this.gender = ''
    this.image = ''
    this.proffesion = ''
    this.location = ''
    this.department =this.departmentList[0];
    console.log("end reseting")
  }

  OnAddedTeacher() {
    this.ngxLoader.start()
    if (this.first_name == '' || this.last_name == '' || this.age == '' || this.email == '' || this.phone_number == '' || this.gender == '' || this.department == this.departmentList[0]) {
      this.ngxLoader.stop()
      this.OnShowAddedStudentWarning();
      return;
    }
    this.teacherObj.uid = '';
    this.teacherObj.first_name = this.first_name;
    this.teacherObj.last_name = this.last_name;
    this.teacherObj.age = this.age;
    this.teacherObj.email = this.email;
    this.teacherObj.phone_number = this.phone_number;
    this.teacherObj.gender = this.gender;
    this.teacherObj.image = this.image;
    this.teacherObj.department = this.department;
    this.teacherObj.studentList = [];
    console.log(this.teacherObj)
    this.addTeacherService.RegisterTeacher(this.teacherObj).then((user)=>{
      if(user.user?.uid != null || user.user?.uid != undefined){
        this.teacherObj.uid = user.user.uid;
        this.addTeacherService.AddTeacherDetails(this.teacherObj).then(()=>{
          this.addTeacherService.logOutSecondaryAndLogInPrimary()?.then(async (user)=>{
            this.addTeacherService.SendMail(this.teacherObj).subscribe((resp)=>{
              this.OnShowAddedStudentSuccess();
              console.log("called OnResetedForm")
              this.OnResetedForm();
              console.log("completed OnResetedForm")
              if(user.user?.uid != undefined){
                console.log("89088888888888888888888888888888888888888888888888888888888888888888888888")
                this.firebaseAuth.currentUser.then((user)=>{
                  console.log(user?.email)
                  this.ngxLoader.stop()
                },err=>{
                  this.ngxLoader.stop()
                })
              }
            },err=>{
              this.ngxLoader.stop()
            })
          })
        });
      }
    },err=>{
      this.ngxLoader.stop()
      alert("unable to the Add the User :" + err)
      this.OnShowAddedStudentWarning();
    })
  }
}
