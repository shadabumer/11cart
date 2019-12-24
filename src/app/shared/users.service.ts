import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public afAuth: AngularFireAuth,
    public router: Router) { }

  // Sign up with email/password
  registerUser(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        window.alert("You have been successfully registered!");
        console.log(result.user)
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  
   // Sign in with email/password
  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
         this.router.navigate(['<!-- enter your route name here -->']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  
   userDetails(){
     return firebase.auth().currentUser;
   }
}
