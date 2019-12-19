import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Category } from '../models/Category.Model';
import { CategoryService } from '../shared/category.service';
import { Item } from '../models/Item.Model';
import { ManageItemsService } from '../shared/manage-items.service';

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
  }


}
