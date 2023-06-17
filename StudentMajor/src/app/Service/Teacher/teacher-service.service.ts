import { Injectable } from '@angular/core';
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
import { concatMap, from, map, Observable, take, tap } from 'rxjs';
import { Student } from 'src/app/modal/student';

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {

  constructor(private firestore: Firestore) { }

  GetStudentListOfCurrentProctor(proctorId:string): Observable<Student[]>{
    const ref = collection(this.firestore, 'Student');
    const queryAll = query(ref,where("proctorID","==",proctorId));
    return collectionData(queryAll) as Observable<Student[]>;
  }
}
