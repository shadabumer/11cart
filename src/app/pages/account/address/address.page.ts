import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/shared/address.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  addressForm: FormGroup;
  isSubmitted: boolean = false;
  currentAddress: Address;
  subscription: Subscription;
  currentAdddress$: Observable<Address>;


  constructor(private address: AddressService) { }

  ngOnInit() {
    this.addressForm = new FormGroup({
      houseNo: new FormControl('', Validators.required),
      buildingName: new FormControl('', Validators.required),
      areaDetails: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
    });

    //getting current address
    // this.subscription = this.address.getAddress()
    // .subscribe((addressData: Address) => {
    //   this.currentAddress = addressData;
    //   console.log('current Address', this.currentAddress);
    // })
  }

   // convenience getter for easy access to form fields
   get f() { return this.addressForm.controls; }

   onSubmit() {
    this.isSubmitted = true;
    if (this.addressForm.invalid) return;

    let newAddress: Address =  {
      houseNo: this.f.houseNo.value,
      buildingName: this.f.buildingName.value,
      areaDetails: this.f.areaDetails.value,
      city: this.f.city.value,
      pincode: this.f.pincode.value
    }

    this.address.createAddress(newAddress);

    this.addressForm.reset();
    this.isSubmitted = false;
   }

}
