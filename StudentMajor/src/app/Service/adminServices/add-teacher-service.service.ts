import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  setDoc,} from '@angular/fire/firestore';
import { Teacher } from 'src/app/modal/teacher';
import { AuthService } from 'src/app/shared/auth.service';
import { EmailModel } from 'src/app/modal/emailModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddTeacherServiceService {
  private emailEndPoint = "http://localhost:3000/SendMail";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private fireauth:AngularFireAuth,private fireStore:Firestore,private http: HttpClient) { }
  RegisterTeacher(teacherData:Teacher) {
    return this.fireauth.createUserWithEmailAndPassword(teacherData.email,"123456789")
  }

  AddTeacherDetails(teacherData:Teacher){
    const ref = doc(this.fireStore, 'Teacher', teacherData.uid);
    return setDoc(ref,teacherData);
  }

  logOutSecondaryAndLogInPrimary(){
    var userName = localStorage.getItem('username')
    var password = localStorage.getItem('password')
    if(userName == null || password == null)return;
    return this.fireauth.signInWithEmailAndPassword(userName,password)
  }

  SendMail(teacherData:Teacher){
    let emailToSend:EmailModel = {
      fromAddress:"",
      toAddresses:[teacherData.email],
      subject:"Login Credentials",
      emailBody:`<b>Wellcome to SIT your login crediantials to the our portal is \n UserName : ${teacherData.email}\nPassword : 123465789<b>`,
      attechments:"",
    }
    console.log(emailToSend)
    return this.http.post(this.emailEndPoint,emailToSend,this.httpOptions)
  }
}