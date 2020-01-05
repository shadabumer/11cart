import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})

export class UsersService {

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
    return this.db.collection('users').doc(user.id).set({...user});
  }

  getUser(id: string) {
    return this.db.collection('users').doc(id).get();
  }
  
  // Sign in with email/password
  async login(email, password) {
    const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    
    const userToken = user.user.refreshToken;
    this.storage.set(TOKEN_KEY, userToken).then(() => {
      this.authenticationState.next(true);
    });
    return user;
  }

  async logout() {
    await this.afAuth.auth.signOut;
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
  
   userDetails(){
     return this.afAuth.auth.currentUser;
   }

   checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        console.log('check token res:', res);
        this.authenticationState.next(true);
      }
    })
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
