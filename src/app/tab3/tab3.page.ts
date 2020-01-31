import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Product, CartService } from '../services/cart.service';
import { Item } from '../models/item.model';
import { ManageItemsService } from '../shared/manage-items.service';
import { Stock } from '../models/stock.model';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  cart: Item[] = [];
  subscriptions: Subscription[];

  constructor(private cartService: CartService,
    private itemService: ManageItemsService,
    private alertCtrl: AlertController,
    private db: AngularFirestore) { }

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

    this.updateStock();
    

    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your items as soon as possible',
      buttons: ['OK']
    });
    alert.present();
  }

  // Decreasing the stock of selected item
  updateStock() {
    // this.cart.forEach(item => {
    //   let subscribe:Subscription = this.itemService.getStock(item.id)
    //     .subscribe((data: Stock) => {
    //       let stock: Stock = {
    //         stock: data.stock - item.amount
    //       };
    //       console.log(item.name, stock.stock);
    //       this.itemService.updateStock(item.id, stock);
    //     })
      
    // });

    // this.cart.forEach(item => {
    //   let cartItem = this.db.collection('stocks', ref => ref.where(ref.id, '==', item.id)).get();
    //   console.log('cart stock items:', cartItem);
    // })
   let stocks = [];

   this.cart.forEach(item => {
     this.itemService.getStock(item.id).subscribe((data: Stock) => {
       stocks.push(data.stock);
     });
   })
   console.log('stocks data:', stocks);

   this.cart.forEach((item, index) => {
     console.log('stocks[index]', stocks[index]);
    let stock: Stock = {
      stock: stocks[index] - item.amount
    };
    this.itemService.updateStock(item.id, stock);

    this.db.collection('stocks').doc(item.id).set({stock: stock - item.amount})
   })
    // stockIds.forEach(id => {
    //   let stock: Stock = {
    //     stock: 5
    //   };
    //   this.itemService.updateStock(id, stock);
    // }) 
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
