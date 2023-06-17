import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection,
  collectionData,
  doc,
  docData,
  Firestore,
  updateDoc,
  query,
  setDoc,} from '@angular/fire/firestore';
import { Student } from 'src/app/modal/student';
import { AuthService } from 'src/app/shared/auth.service';
import  firebase from 'firebase/compat/app';
import { firstValueFrom, Observable } from 'rxjs';
import { EmailModel } from 'src/app/modal/emailModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddStudentServiceService {

  private emailEndPoint = "http://localhost:3000/SendMail";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private fireStore:Firestore,private fireauth:AngularFireAuth,private http: HttpClient) { }

  RegisterStudent(studentData:Student){
    return this.fireauth.createUserWithEmailAndPassword(studentData.email,"123456789")
  }
  AddStudentDetails(studentData:Student){
    const ref = doc(this.fireStore, 'Student', studentData.uid);
    return setDoc(ref,studentData);
  }

  updateStudentDetails(proctorId:string,studentData:Student){
    const ref = doc(this.fireStore, 'Student', studentData.uid);
    return updateDoc(ref,{'proctorID':proctorId})
  }

  logOutSecondaryAndLogInPrimary(){
    var userName = localStorage.getItem('username')
    var password = localStorage.getItem('password')
    if(userName == null || password == null)return;
    
    return this.fireauth.signInWithEmailAndPassword(userName,password)
  }
  SendMail(studentData:Student){
    let emailToSend:EmailModel = {
      fromAddress:"",
      toAddresses:[studentData.email],
      subject:"Login Credentials",
      emailBody:`<b>Wellcome to SIT your login crediantials to the our portal is \n UserName : ${studentData.email}\nPassword : 123465789<b>`,
      attechments:"",
    }
    console.log(emailToSend)
    return this.http.post(this.emailEndPoint,emailToSend,this.httpOptions)
  }
}