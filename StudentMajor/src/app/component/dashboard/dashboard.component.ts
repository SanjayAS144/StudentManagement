import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonService } from 'src/app/Service/common.service';
import { UsersService } from 'src/app/Service/users.service';
import  firebase from 'firebase/compat/app';
import { AdminDashboardComponent } from '../admin/admin-dashboard/admin-dashboard.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription, connect, map } from 'rxjs';
import { Announcement } from 'src/app/modal/announcement';
import { AnnouncementService } from 'src/app/Service/common/announcement.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUserId?:string;
  currentUser?:any;
  subscription: Subscription | undefined 
  userRole:string = ''
  
  constructor(
    private router:Router, 
    private auth:AuthService,
    private fireBaseAuth:AngularFireAuth,
    private common:CommonService,
    private userService:UsersService,
    private ngxLoader:NgxUiLoaderService
    ){
  }
  ngOnDestroy(): void {
    console.log("Destroy---------------------------------------")
    this.subscription?.unsubscribe()
  }
  ngOnInit(): void {
    console.log("Start---------------------------------------")
    this.ngxLoader.start()
    this.subscription =  this.userService.getCurrentUser().subscribe((user)=>{
      console.log(user?.uid)
      this.currentUserId = user?.uid;
      this.currentUser = user;
      if(this.currentUserId == undefined || this.currentUserId == null){
        this.ngxLoader.stop()
        this.router.navigate(['/role'])
      }else{
        this.common.userId = this.currentUserId
        this.userService.getAdminDetails(this.currentUserId).subscribe((user)=>{
          if(user == null || user == undefined){
            console.log("Details not found")
            this.checkIfStudentOrTeacher()
          }else{
            this.common.roleData = user['role']
            this.userRole = this.common.roleData
            console.log("end")
            this.ngxLoader.stop()
            
          }
        })
      }
    })
  }

  checkIfStudentOrTeacher(){
    console.log(this.currentUserId)
    if(this.currentUserId == null)return;
    this.userService.getCurrentUserdetails('Student',this.currentUserId).subscribe((user)=>{
      if(user == null || user == undefined ){
        if(this.currentUserId == null)return;
        this.userService.getCurrentTeacherDetails('Teacher',this.currentUserId).subscribe((user)=>{
          if(user == null || user == undefined){
            this.subscription?.unsubscribe()
            this.ngxLoader.stop()
            this.fireBaseAuth.signOut()
            this.router.navigate(['/role'])
            alert("Eiteer UserNot Exist or the Role Does not Match")
          }
          this.common.userId = user.uid
          this.common.roleData = user.role
          this.userRole = this.common.roleData
          this.ngxLoader.stop()
        })
      }else{
        this.common.userId = user.uid
        this.common.roleData = user.role
        this.userRole = this.common.roleData
        this.ngxLoader.stop()
      } 
    })
  }
}
