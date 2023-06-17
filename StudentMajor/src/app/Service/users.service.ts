import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDoc,
  query,
  setDoc,} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Student } from '../modal/student';
import { Teacher } from '../modal/teacher';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private fireStore:Firestore,private fireBaseAuth:AngularFireAuth) { }

  addUser(userId?:string,userDetalis?:any){
    if(userId == undefined || userDetalis == undefined)return;
    const ref = doc(this.fireStore, 'admin', userId);
    setDoc(ref, userDetalis).then(()=>{
      alert("User Added Successfully")
    })
  }

  getCurrentUser(){
    this.fireBaseAuth.authState.subscribe((user)=>{
      console.log(user?.email)
    })
    return this.fireBaseAuth.authState;
  }

  getAdminDetails(uid:string){
    const ref = doc(this.fireStore,'admin',uid);
    return docData(ref)
  }

  getCurrentUserdetails(role:string,uid:string) :Observable<Student>{
    const ref = doc(this.fireStore, role,uid);
    return docData(ref) as Observable<Student>
  }

  getCurrentTeacherDetails(role:string,uid:string):Observable<Teacher> {
    const ref = doc(this.fireStore, role,uid);
    return docData(ref) as Observable<Teacher>
  }
}
