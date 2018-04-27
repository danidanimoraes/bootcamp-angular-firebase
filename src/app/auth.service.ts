import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'; // pq eh uma lib nao pro angular mas generica

@Injectable()
export class AuthService implements CanActivate {

  canActivate()
  {
    return true;
  }
  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  login()
  {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  logout()
  {
    this.angularFireAuth.auth.signOut();
  }
}
