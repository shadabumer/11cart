import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Item } from '../models/Item.Model';


@Injectable({
  providedIn: 'root'
})
export class ManageItemsService {

  constructor(private db: AngularFirestore) { }

  createItem(item: Item) {
    return this.db.collection('items').add({...item});
    
  }

  getItem(id: string) {
    return this.db.collection('items').doc(id).get();
  }

  getItems() {
    return this.db.collection('items').snapshotChanges()
    .pipe(map(document => {
      return document.map(changes => {
        return {
          id: changes.payload.doc.id,
          ...changes.payload.doc.data(),
        }
      })
    }))
  }

  deleteItem(id: string) {
    this.db.collection('items').doc(id).delete();
  }

  updateItem(id: string, newItem: Item) {
    this.db.collection('items').doc(id).update(newItem);
  }

  getItemsByCategory(categoryId: string) {
    
  }
}
