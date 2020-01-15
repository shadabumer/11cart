import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models/item.model';

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  // items: Product[] = [
  //   {id: 0, name: 'onion', price: 50, amount: 1},
  //   {id: 1, name: 'bread', price: 30, amount: 1},
  //   {id: 2, name: 'chocolate', price: 100, amount: 1},
  // ];

  private cart: Item[] = [ 
    // {id: 0, name: 'onion', price: 50, amount: 1},
    // {id: 2, name: 'chocolate', price: 100, amount: 1},
    // {id: 1, name: 'bread', price: 30, amount: 1},
   ];
  private cartItemCount = new BehaviorSubject(0);

  constructor() { }

  // getProducts() {
  //   return this.items;
  // }

  getcart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product: Item) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product: Item) {
    
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product: Item) {
    
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }

}
