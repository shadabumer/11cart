import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Product, CartService } from '../services/cart.service';
import { Item } from '../models/item.model';
import { ManageItemsService } from '../shared/manage-items.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  cart: Item[] = [];

  constructor(private cartService: CartService,
    private itemService: ManageItemsService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.cart = this.cartService.getcart();
  }

  decreaseCartItem(product: Item) {
    this.cartService.decreaseProduct(product);
  }

  increaseCartItem(product: Item) {
    this.cartService.addProduct(product);
  }

  removeCartItem(product: Item) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  async checkout() {
    // Perfom PayPal or Stripe checkout process
    console.log('cart items:', this.cart);

    this.cart.forEach(item => {
      let stock: Stock = {
        stock
      }
      this.itemService.updateStock(item.id, stock);
    })

    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your items as soon as possible',
      buttons: ['OK']
    });
    alert.present();
  }

}
