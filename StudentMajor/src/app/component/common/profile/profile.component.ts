import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AddStudentServiceService } from 'src/app/Service/Student/add-student-service.service';
import { UsersService } from 'src/app/Service/users.service';
import { Student } from 'src/app/modal/student';
import { Teacher } from 'src/app/modal/teacher';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  defaultImage = "https://mdbootstrap.com/img/new/avatars/8.jpg"
  selectedFile:File|undefined|null
  profileImage = this.defaultImage
  userName = ""
  email = ""
  phone = ""
  proctorName = ""
  role = "Student"
  currentUserId : string|null = ""
  percentage = 0;
  isUpdateDisabled = true
  currentUser:Student|Teacher|undefined

  constructor(private userService:UsersService,private ngxLoader:NgxUiLoaderService,private studentService:AddStudentServiceService){
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("UserId")
    if(this.currentUserId != null){
      this.ngxLoader.start()
      this.userService.getCurrentUserdetails("Student",this.currentUserId).subscribe((user:Student)=>{
        if(user!= undefined){
          this.currentUser = user
          this.profileImage = user.image == ""?this.defaultImage:user.image
          this.userName = user.first_name + " "+ user.last_name
          this.email = user.email
          this.phone = user.phone_number
          this.role = "Student"
          this.userService.getCurrentTeacherDetails("Teacher",user.proctorID).subscribe((teacher:Teacher)=>{
            if(user!= undefined){
                this.proctorName = teacher.first_name + " " + teacher.last_name 
                this.ngxLoader.stop()
            }
          },err=>{
            this.ngxLoader.stop()
          })
        }
      },err=>{

      })

      this.userService.getCurrentTeacherDetails("Teacher",this.currentUserId).subscribe((teacher:Teacher)=>{
        if(teacher!= undefined){
          this.currentUser = teacher
          this.profileImage = teacher.image == ""?this.defaultImage:teacher.image
          this.userName = teacher.first_name + " "+ teacher.last_name
          this.email = teacher.email
          this.phone = teacher.phone_number
          this.role = "Teacher"
          this.ngxLoader.stop()
        }
      },err=>{
        this.ngxLoader.stop()
      })
    }
  }

  onImageSelect(event:any){
    const fileList:FileList = event.target.files
    this.selectedFile = fileList?.item(0)
    if(this.selectedFile == null || this.selectedFile == undefined)return;
    this.profileImage = URL.createObjectURL(this.selectedFile)
    console.log("Select a profile Image " +  this.profileImage)
    this.isUpdateDisabled = false
  }

  onUpdate(){
    if(this.currentUser != null && this.selectedFile != null && this.selectedFile != undefined){
      this.ngxLoader.start()
      this.currentUser.image = this.profileImage
      this.userService.pushFileToStorage(this.selectedFile,this.currentUser).subscribe((progress)=>{
        this.percentage = Math.round(progress? progress:0)
        if(this.percentage == 100){
          this.ngxLoader.stop()
          alert("Profile is Updated")
        }
      },err=>{
        this.ngxLoader.stop()
        alert("Failed to Update Profile: " + err)
      })
    }
  }
}
