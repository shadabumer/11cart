import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/shared/users.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(public user: UsersService,
    private toastController: ToastController) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    const user = this.user.login(this.f.email.value, this.f.password.value);

    user.then( userData => {
      console.log('login success:', userData.user);
      this.isSubmitted = false;
      this.displayToast('login success', 'Authentication-success');
    }).catch(error => {
      console.log('login failure:', error);
      this.isSubmitted = false;
      this.displayToast(error.message, 'Authentication-error');
    });

    this.loginForm.reset();
  }

  async displayToast(message: string, cssClass: string) {
    const toast = await this.toastController.create({
      message,
      cssClass,
      showCloseButton: true,
      duration: 3000,
    });
    toast.present();
  }

}
