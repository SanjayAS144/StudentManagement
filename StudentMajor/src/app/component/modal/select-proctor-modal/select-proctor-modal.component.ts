import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Teacher } from 'src/app/modal/teacher';

@Component({
  selector: 'app-select-proctor-modal',
  templateUrl: './select-proctor-modal.component.html',
  styleUrls: ['./select-proctor-modal.component.css']
})
export class SelectProctorModalComponent {
  defaultImage = "https://mdbootstrap.com/img/new/avatars/8.jpg"
  headers = ['Name', 'Age', 'Department', 'Phone', 'gender',];
  teacherList:Teacher[] | undefined;
  selectedRow:Teacher | undefined
  constructor(public modalRef: MdbModalRef<SelectProctorModalComponent>) {}
  onRowSelect(teacher:Teacher){
    console.log(teacher.email)
    this.selectedRow = teacher
  }

  close(){
    this.modalRef.close(this.selectedRow)
  }
}
