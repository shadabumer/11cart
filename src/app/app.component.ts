import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UsersService } from './shared/users.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authenticationService: UsersService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#2e256d');
      this.statusBar.styleLightContent();

      // this.authenticationService.checkToken();

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      });
    });
  }

  logout() {
    const response = this.authenticationService.logout();
    response.then( success => {
      this.router.navigate(['login']);
    })
    .catch(error => {
      console.log('something went wrong:', error);
    })
  }
}
