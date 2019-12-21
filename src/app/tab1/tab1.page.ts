import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { CategoryService } from '../shared/category.service';
import { ManageItemsService } from '../shared/manage-items.service';
import { Category } from '../models/category.model';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  categories: Category[];
  isCategoriesLoaded: boolean = false;
  items: Item[];
  isItemsLoaded: boolean = false;
  
  constructor(public categoryService: CategoryService,
              public itemService: ManageItemsService) {}

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe((categoryList: any) => {
        this.categories = categoryList;
        this.isCategoriesLoaded = true;
      })

    this.itemService.getItems()
    .subscribe((itemsList: any) => {
      this.items = itemsList;
      this.isItemsLoaded = true;
    })

    this.itemService.getItemsByCategory("MMjQND8mlW0shkW7twLD")
      .subscribe( items => {
        console.log('items by category:', items);
      })
  }
//"MMjQND8mlW0shkW7twLD"

}
