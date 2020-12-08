import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.afAuth.user.subscribe((user) =>{
        if (user){
         resolve(true);
        }else {
          this.navCtrl.navigateRoot(['']);
          resolve(false);
        }
      });
    });
  }

}
