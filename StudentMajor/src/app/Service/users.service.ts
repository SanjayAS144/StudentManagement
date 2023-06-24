import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { collection,
  collectionData,
  doc,
  docData,
  updateDoc,
  Firestore,
  getDoc,
  query,
  setDoc,} from '@angular/fire/firestore';
import { finalize, map, Observable } from 'rxjs';
import { Student } from '../modal/student';
import { Teacher } from '../modal/teacher';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private basePath = '/uploads'
  constructor(private fireStore:Firestore,private fireBaseAuth:AngularFireAuth, private storage: AngularFireStorage) { }

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

  updateUserDetails(userDetails:Student|Teacher){
    const ref = doc(this.fireStore, userDetails.role, userDetails.uid);
    return updateDoc(ref,{'image':userDetails.image})
  }

  pushFileToStorage(fileToUpload: File,userDetails:Student|Teacher): Observable<number | undefined>{
    const filePath = `${this.basePath}/${fileToUpload.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileToUpload);
    
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(async (downloadURL) => {
          userDetails.image = downloadURL
          this.updateUserDetails(userDetails)
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }
}
