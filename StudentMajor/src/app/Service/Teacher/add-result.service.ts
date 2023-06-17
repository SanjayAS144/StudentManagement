import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize, firstValueFrom } from 'rxjs';
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
import { Results } from 'src/app/modal/results';

@Injectable({
  providedIn: 'root'
})
export class AddResultService {
  private basePath = '/uploads'
  constructor(private firestore: Firestore, private storage: AngularFireStorage) { }

  pushFileToStorage(fileToUpload: File,result:Results,studentId:string): Observable<number | undefined>{
    const filePath = `${this.basePath}/${fileToUpload.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileToUpload);
    
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(async (downloadURL) => {
          result.Attachements = downloadURL
          this.addResults(result,studentId)
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  addResults(result:Results,studentId:string){
    const ref = collection(this.firestore, 'Student', studentId, 'Results');
    addDoc(ref,result)
  }

  getResults(studentId:string){
    console.log(studentId)
    const ref = collection(this.firestore, 'Student', studentId, 'Results');
    const queryAll = query(ref)
    return collectionData(queryAll) as Observable<Results[]>
  }
}
