import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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
import { concatMap, finalize, from, map, Observable, take, tap } from 'rxjs';
import { Announcement } from 'src/app/modal/announcement';
import { Chat } from 'src/app/modal/chat';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private basePath = '/uploads'
  constructor(private firestore: Firestore, private storage: AngularFireStorage) {
   }
   
   addChatMessage(message:Chat){
    const ref = collection(this.firestore, 'chats', message.groupId, 'messages');
    addDoc(ref,message);
  }

  getChatMessage(groupId:string): Observable<Chat[]>{
    const ref = collection(this.firestore, 'chats', groupId, 'messages');
    const queryAll = query(ref, orderBy('timeStamp', 'desc'));
    return collectionData(queryAll) as Observable<Chat[]>;
  }

  addNonTextMessages(fileToUpload: File,message:Chat): Observable<number | undefined>{
    const filePath = `${this.basePath}/${fileToUpload.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileToUpload);
    
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          message.link = downloadURL
          this.addChatMessage(message)
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }
}
