import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  isSubmitted: boolean = false;
  currentUser: User;
  isUserLoaded: boolean = false;
  subscription: Subscription;



  constructor(private user: UsersService, navParams: NavParams, private modalCtrl: ModalController) {
    this.currentUser = navParams.get('currentUser');
    // let userId = this.user.userDetails().uid;

    // this.subscription =  this.user.getUser(userId).subscribe((userData: User) => {
    //   console.log('user data:', userData);
    //   this.currentUser = userData;
    //   this.isUserLoaded = true;

    // })
   }

  ngOnInit() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.currentUser.firstName),
      lastName: new FormControl(this.currentUser.lastName),
      mobile: new FormControl(this.currentUser.mobile),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  onSubmit() {
    let editUser: User = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      mobile: this.f.mobile.value,
      email: this.currentUser.email
    }
    console.log('form submitted:', editUser);
    this.modalCtrl.dismiss({ 'dismissed': true });
  }


  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
