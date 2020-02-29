import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  paymentForm: FormGroup;
  isCardSelected: boolean = false;
  isSubmitted: boolean = false;

  constructor() { }

  ngOnInit() {
    this.paymentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      cardNumber: new FormControl('', Validators.required),
      expiry: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.paymentForm.controls; }

  onSubmit() {
    this.isSubmitted = true;

    if(!this.isCardSelected) {
      if (this.paymentForm.invalid) return;
      this.paymentForm.reset();
    }

    console.log('payment form is submitted');

    this.isSubmitted = false;
  }


}
