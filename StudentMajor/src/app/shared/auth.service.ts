import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth, private router: Router) { }

  login(email:string,password: string ){
    this.fireauth.signInWithEmailAndPassword(email,password).then((user)=>{
        if( user.user?.uid)
          localStorage.setItem('UserId',user.user?.uid);
        console.log("IIIIIIIIIIIIIIIIIIIII am Sanjay")
        console.log(user.user?.uid)
        this.router.navigate(['/dashboard']);
    },
    err => {
        alert(err.message);
        this.router.navigate(['/login']);
    });
  }

  register(email:string,password: string ){
    this.fireauth.createUserWithEmailAndPassword(email,password).then((user)=>{
      alert('Registration is Successful');
      console.log(user.user?.uid)
      this.router.navigate(['/login']);
    },err=>{
        alert(err.message);
        this.router.navigate(['/register']);
    })
  }

  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('UserId');
      this.router.navigate(['/login']);
    },err=>{
      alert(err.message);
    })
  }

  getCurrentUser(){
    let userId = ''
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log(this.fireauth.currentUser)
    this.fireauth.authState.subscribe(user=>{
      console.log('-------------------')
      console.log(user)
    })
  }
}
