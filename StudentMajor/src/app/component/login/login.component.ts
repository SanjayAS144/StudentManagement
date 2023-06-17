import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email:string = '';
  password:string = '';
  constructor(private auth:AuthService,private commonData:CommonService){

  }
  ngOnInit(): void {
    console.log(this.commonData.roleData)
  }

  login(){
    if(this.email == ''){
      alert('Please Enter the Email')
      return;
    }
    if(this.password == ''){
      alert('Please Enter the Password')
      return;
    }
    if(this.commonData.roleData == 'admin'){
      localStorage.setItem('username',this.email)
      localStorage.setItem('password',this.password)
    }
    this.auth.login(this.email,this.password);
    this.email = ''
    this.password = ''
  }

}
