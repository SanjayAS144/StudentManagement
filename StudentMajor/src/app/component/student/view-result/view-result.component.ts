import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddResultService } from 'src/app/Service/Teacher/add-result.service';
import { Results } from 'src/app/modal/results';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit{
  resultList:Observable<Results[]> |undefined
  currentUserId:string|undefined|null = ""

  constructor(private resultService:AddResultService){}
  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("UserId")
    this.resultList = this.resultService.getResults(this.currentUserId??"")
  }


}
