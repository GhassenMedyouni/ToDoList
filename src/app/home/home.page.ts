import {Component, OnInit} from '@angular/core';

import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  constructor( private  authService: AuthService,
               private router: Router ,
               private alertCtrl: AlertController) {}

  async logOut():
      Promise<void>{
    this.authService.logOut()
        .then(
            () => {
              this.router.navigateByUrl('login');
            },
            // tslint:disable-next-line:jsdoc-format
            async error => {
              const  alert = await  this.alertCtrl.create({
                message: error.message,
                buttons: [{text: 'ok', role: 'cancel'}],
              });
              await alert.present();
            }
        );
  }

  ngOnInit() {}
}
