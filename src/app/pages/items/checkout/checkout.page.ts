import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cartItems: Item[];
  total: Number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getcart();
    this.total = this.cartItems.reduce((i, j) => i + j.price * j.amount, 0);
  }

}
