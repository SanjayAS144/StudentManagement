import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Student } from '../modal/student';
import { Teacher } from '../modal/teacher';
import { UsersService } from '../Service/users.service';

@Pipe({
  name: 'displayImage',
})
export class ImageDisplayPipe implements PipeTransform {
  constructor(private datePipe: DatePipe,private userService:UsersService) {}

    transform(userImage:string,userId:string,groupId:string): Observable<Student|Teacher> {
        let userRole = "Student"
        if(userId == groupId){
            userRole = "Teacher"
        }
        return this.userService.getCurrentUserdetails(userRole,userId)
    }
}