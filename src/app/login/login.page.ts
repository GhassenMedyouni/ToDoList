import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ModalController} from '@ionic/angular';
import {FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(private  authService: AuthService, private modelController: ModalController, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
  }

  async loginUser(){
    await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
  }

  goToReset() {
    this.router.navigateByUrl('password-reset');
  }

  goToSignUp() {
    this.router.navigateByUrl('sign-up');
  }
}
