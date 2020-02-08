import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {

  constructor(private router: Router,
    private modalController: ModalController) { }

  ngOnInit() {}

  async editProfile() {
    const modal = await this.modalController.create({
      component: EditProfileComponent,
      cssClass: 'edit-profile'
    });
    return await modal.present();
  }

  goHome() {
    this.router.navigate(['tabs', 'tab1']);
  }

}
