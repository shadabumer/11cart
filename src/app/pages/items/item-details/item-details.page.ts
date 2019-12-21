import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  currentItem: any;

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    
    // this.currentItem.id = this.route.snapshot.queryParams.id;
    // this.currentItem.category = this.route.snapshot.queryParams.category;
    // this.currentItem.categoryId = this.route.snapshot.queryParams.categoryId;
    // this.currentItem.description = this.route.snapshot.queryParams.description;
    // this.currentItem.imageUrl = this.route.snapshot.queryParams.imageUrl;
    // this.currentItem.name = this.route.snapshot.queryParams.name;
    // this.currentItem.price = this.route.snapshot.queryParams.price;
    // this.currentItem.status = this.route.snapshot.queryParams.status;
    this.currentItem = this.route.snapshot.queryParams;

    console.log('current Item:', this.currentItem);
  }

}
