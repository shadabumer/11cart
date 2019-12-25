import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public afAuth: AngularFireAuth,
    public router: Router,
    public db: AngularFirestore) { }

  // Sign up with email/password
    async createAccount(email, password) {
      const newUser = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      return newUser;
    }


  registerUser(user: User) {
    return this.db.collection('users').add({...user});
  }
  
  // Sign in with email/password
  async login(email, password) {
    const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return user;
  }

  async logout() {
    await this.afAuth.auth.signOut;
  }
  
   userDetails(){
     return this.afAuth.auth.currentUser;
   }
}
