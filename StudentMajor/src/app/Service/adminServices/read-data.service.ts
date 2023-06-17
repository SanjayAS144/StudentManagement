import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Student } from 'src/app/modal/student';
import { Teacher } from 'src/app/modal/teacher';
@Injectable({
  providedIn: 'root'
})
export class ReadDataService {

  constructor(private firestore: Firestore) { }

  getAllStudents():Observable<Student[]>{
    const ref = collection(this.firestore, 'Student');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<Student[]>;
  }

  getAllTeachers():Observable<Teacher[]>{
    const ref = collection(this.firestore, 'Teacher');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<Teacher[]>;
  }
  getAllTeacherOfCurentBranch(department:string):Observable<Teacher[]>{
    const ref = collection(this.firestore, 'Teacher');
    const queryAll = query(ref,where("department","==",department));
    return collectionData(queryAll) as Observable<Teacher[]>;
  }
}
