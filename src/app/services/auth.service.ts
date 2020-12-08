import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private navCtrl: NavController, public afAuth: AngularFireAuth) {
    afAuth.onAuthStateChanged((user) => {
      if (user){
        this.navCtrl.navigateRoot(['/home']);
        console.log(user.uid);
      } else {
        this.navCtrl.navigateRoot(['']);
      }
    });
  }

  async loginUser( email: string, password: string){
   await this.afAuth.signInWithEmailAndPassword(email, password).then((success) => {
      console.log(success);
    });
  }

  async signUpUser(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password).then((success) => {
      console.log(success);
    }).catch((error) => {
      console.log(error);
    });
  }

  async resetPassword(email: string){
    await this.afAuth.sendPasswordResetEmail(email).then((success) => {
      console.log(success);
    });
  }

  async logOut(){
    await this.afAuth.signOut().then(() => {
      console.log('logged Out');
      // tslint:disable-next-line:no-shadowed-variable
    }).catch((error) => {
      console.log(error);
    });
  }
}
