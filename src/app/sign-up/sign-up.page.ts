import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
    public registreForm: FormGroup;

  constructor( private authService: AuthService) {
      this.registreForm = new FormGroup({
          email: new FormControl(),
          password: new FormControl(),
          fullname: new FormControl(),
      });
  }

  ngOnInit() {
  }


    async signUpUser(){
        await this.authService.signUpUser(this.registreForm.value.email, this.registreForm.value.password);
    }
}
