import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Service/common.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {  
  role:string = 'Select A Role'
  constructor(private commonData:CommonService,private router:Router){}
  login(){
    console.log(this.role)
    if(this.role == 'Select A Role'){
      alert("Select a Appropriate role")
      return;
    }
    this.commonData.roleData = this.role
    this.router.navigate(['/login'])
  }
}
