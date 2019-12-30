import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  TOKEN_KEY: string = 'auth-token';
  authenticationState = new BehaviorSubject(false);

  constructor(public afAuth: AngularFireAuth,
    public router: Router,
    public db: AngularFirestore,
    public storage: Storage,
    public plt: Platform) {
      
     }

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
    this.storage.set(this.TOKEN_KEY, 'Bearer 1234567').then(() => {
      this.authenticationState.next(true);
    });
    return user;
  }

  async logout() {
    await this.afAuth.auth.signOut;
    return this.storage.remove(this.TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
  
   userDetails(){
     return this.afAuth.auth.currentUser;
   }

   checkToken() {
    this.storage.get(this.TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
