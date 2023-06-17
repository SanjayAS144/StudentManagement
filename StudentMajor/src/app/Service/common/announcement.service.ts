import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize, firstValueFrom } from 'rxjs';
import { Announcement } from 'src/app/modal/announcement';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { EmailModel } from 'src/app/modal/emailModel';
import { Student } from 'src/app/modal/student';
import { getDocs } from 'firebase/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private emailEndPoint = "http://localhost:3000/SendMail";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  private basePath = '/uploads'
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage,private firestore: Firestore,private http: HttpClient) { }

  pushFileToStorage(fileToUpload: File,eventDetails:Announcement): Observable<number | undefined>{
    const filePath = `${this.basePath}/${fileToUpload.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileToUpload);
    
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(async (downloadURL) => {
          eventDetails.Attachements = downloadURL
          await this.sendEmail(eventDetails);
          this.addAnnouncement(eventDetails)
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  addAnnouncement(eventDetails:Announcement){
    const ref = collection(this.firestore, 'Announcements');
    addDoc(ref,eventDetails);
  }

  getAllAnnouncement(): Observable<Announcement[]>{
    const ref = collection(this.firestore, 'Announcements');
    const queryAll = query(ref)
    return collectionData(queryAll) as Observable<Announcement[]>
  }

  getAllAnnouncementForTeacher():Observable<Announcement[]>{
    const ref = collection(this.firestore, 'Announcements');
    const queryAll = query(ref,where("SenderRole","==","Admin"))
    return collectionData(queryAll) as Observable<Announcement[]>
  }

  getTopThreeEvents():Observable<Announcement[]>{
    const ref = collection(this.firestore, 'Announcements');
    const queryAll = query(ref,orderBy('EventDate','desc'))
    return collectionData(queryAll) as Observable<Announcement[]>
  }

  async sendEmail(eventDetails:Announcement){
    let emailToSend:EmailModel = {
      fromAddress:"",
      toAddresses:[],
      subject:eventDetails.EventName,
      emailBody:`<b>${eventDetails.EventDescription} will be held on ${eventDetails.EventDate}<b>`,
      attechments:eventDetails.Attachements,
    }
    const studentRef = collection(this.firestore,"Student");
    const teacherRef = collection(this.firestore,"Teacher");
    const studentQuery = eventDetails.SenderRole=="Admin"?query(studentRef):query(studentRef,where("proctorID","==",eventDetails.SenderUid));
    const teacherQuery = query(teacherRef)

    if(eventDetails.SenderRole=="Admin"){
      var studentList = await getDocs(studentQuery);
      var teacherList = await getDocs(teacherQuery);
      studentList.forEach(student => {
        emailToSend.toAddresses.push(student.data()['email'])
      });
      teacherList.forEach(teacher => {
        emailToSend.toAddresses.push(teacher.data()['email'])
      });
    }else{
      var studentList = await getDocs(studentQuery);
      studentList.forEach(student => {
        emailToSend.toAddresses.push(student.data()['email'])
      });
    }
    console.log(emailToSend)
    let emailResult = await firstValueFrom(this.http.post(this.emailEndPoint,emailToSend,this.httpOptions))
    console.log(emailResult)
  }
}