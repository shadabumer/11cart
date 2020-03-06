import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  constructor(private userService: UsersService) { }
  code: string = "Zxvyt6qvJD65RyRBQxSfuzqwkwz1SpK2KDsyKVBoV-kAAAFwprKS-A";
  newPassword: string = "123456";
  // url.split('?')[1].split('&')[1].split('=')[1];

  ngOnInit() {
    this.userService.confirmPasswordReset(this.code, this.newPassword)
    .then(success => {
      console.log('password changed successfully',  success);
    })
    .catch(error => {
      console.log('password error:', error);
    })
  }

}
