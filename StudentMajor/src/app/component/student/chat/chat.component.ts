import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/Service/Chat/post.service';
import { CommonService } from 'src/app/Service/common.service';
import { UsersService } from 'src/app/Service/users.service';
import { Chat } from 'src/app/modal/chat';
import { AuthService } from 'src/app/shared/auth.service';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class StudentChatComponent implements OnInit, AfterViewInit{
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
  constructor(private userService:UsersService,private common:CommonService,private auth:AuthService,private postService:PostService,private elementRef: ElementRef,private ngxLoader:NgxUiLoaderService){}
  
  ngAfterViewInit(): void {
    this.scrollTarget = this.elementRef.nativeElement.querySelector('.scrollTarget');
    console.log(this.scrollTarget)
    if(this.scrollTarget != undefined)
      disableBodyScroll(this.scrollTarget);
  }

  ngOnInit(): void {
    let userId = localStorage.getItem("UserId")
    console.log("Current User Id is "+userId)
    if(userId == null){
      return;
    }
    this.currentUserId = userId
    this.userService.getCurrentUserdetails("Student",userId).subscribe((user)=>{
      if(user.proctorID != undefined){
        this.groupId = user.proctorID;
        this.currentUserName = user.first_name
        console.log(this.groupId)
        this.messages =  this.postService.getChatMessage(this.groupId);
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
        senderUid :this.currentUserId,
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
        senderUid :this.currentUserId,
        message :this.message,
        timeStamp :serverTimestamp(),
        type :"text",
        link : "",
        groupId:this.groupId,
        senderName:this.currentUserName
      }
      this.postService.addChatMessage(messageObject)
      this.onCancle()
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
