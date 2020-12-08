import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
   public resetForm: FormGroup;

  constructor(private  authService: AuthService) {
      this.resetForm = new FormGroup({
          email: new FormControl(),
      });
  }


  ngOnInit() {
  }

  async resetPassword(form) {
   await this.authService.resetPassword(this.resetForm.value.email);
  }

}
