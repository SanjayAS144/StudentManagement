import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { serverTimestamp } from 'firebase/firestore';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/Service/Chat/post.service';
import { ReadDataService } from 'src/app/Service/adminServices/read-data.service';
import { CommonService } from 'src/app/Service/common.service';
import { UsersService } from 'src/app/Service/users.service';
import { Chat } from 'src/app/modal/chat';
import { Student } from 'src/app/modal/student';
import { Teacher } from 'src/app/modal/teacher';
import { AuthService } from 'src/app/shared/auth.service';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit{
  private scrollTarget: HTMLElement | undefined;
  selectedFile?:File;
  toggled: boolean = false;
  isTextAreaDisabled:boolean = false;
  currentUserId:string = "";
  disablepostButton = true;
  message:string = ""
  link:string=""
  posts: any[] = [];
  groupId:string = "";
  currentUserName:string = ""
  messages:Observable<Chat[]> | undefined;
  percentage = 0;
  

  constructor(
    private studentDataService:ReadDataService,
    private ngxLoader:NgxUiLoaderService,
    private auth:AuthService,
    private common:CommonService,
    private userService:UsersService,
    private postService:PostService,
    private elementRef: ElementRef,
    ){}
  ngAfterViewInit(): void {
    this.scrollTarget = this.elementRef.nativeElement.querySelector('.scrollTarget');
    console.log(this.scrollTarget)
    if(this.scrollTarget != undefined)
      disableBodyScroll(this.scrollTarget);
  }

  ngOnInit(): void {
    this.ngxLoader.start()
    this.userService.getCurrentUser().subscribe((user)=>{
      if(user?.uid){
        this.common.userId = user?.uid
        this.currentUserId = user?.uid
        this.common.roleData = "Teacher"
        this.groupId = this.common.userId
        console.log("Current Teacher Id Is "+ this.groupId)
        this.userService.getCurrentTeacherDetails(this.common.roleData,this.common.userId).subscribe((user:Teacher)=>{
          this.currentUserName = user.first_name
          this.ngxLoader.stop()
        })
        this.messages = this.postService.getChatMessage(this.groupId)
      }
    })
  }

  OnUserLogout() {
    this.auth.logout();
  }

  postMessage(): void {
    console.log("message to send "+this.message + this.groupId)
    if(this.message == "")
      return;
      this.ngxLoader.start()
    if(this.selectedFile != undefined){
      const messageObject :Chat = {
        senderUid :this.common.userId,
        message :this.message,
        timeStamp :serverTimestamp(),
        type :"file",
        link : "",
        groupId:this.groupId,
        senderName:this.currentUserName
      }
      this.postService.addNonTextMessages(this.selectedFile,messageObject).subscribe((progress:number | undefined)=>{
        this.percentage = Math.round(progress? progress:0)
        if(this.percentage == 100){
          this.onCancle()
          this.ngxLoader.stop()
        }
      },err=>{
        this.ngxLoader.stop()
      })
    }else{
      const messageObject :Chat = {
        senderUid :this.common.userId,
        message :this.message,
        timeStamp :serverTimestamp(),
        type :"text",
        link : "",
        groupId:this.groupId,
        senderName:this.currentUserName
      }
      this.postService.addChatMessage(messageObject)
      this.onCancle();
      this.ngxLoader.stop()
    }
  }

  onCancle(){
    this.selectedFile = undefined;
    this.message = ""
    this.isTextAreaDisabled = false;
    this.disablepostButton = true;
  }

  OntextEnter(){
    console.log("this.message")
    if(this.message.length == 0){
      this.disablepostButton = true;
      return;
    }

    this.disablepostButton = false;
    console.log(this.message);
  }

  handleSelection(event:any) {
    console.log(event.char);
    this.message += event.char;
    if(this.message.length != 0){
      this.disablepostButton = false;
    }
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
    if(this.selectedFile){
      this.message = this.selectedFile.name
      if(this.message.length > 0){
        this.disablepostButton = false;
        console.log(this.message);
        this.isTextAreaDisabled = true;
      }
    }
    
  }
}
