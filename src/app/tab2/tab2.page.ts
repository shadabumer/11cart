import { Component, OnInit } from '@angular/core';
import { Category } from '../models/Category.Model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categories: Category[];

  
  constructor(public categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe((categoryList: any) => {
        this.categories = categoryList;
        console.log(this.categories);
      })
  }

}
