import { Component, OnInit } from '@angular/core';
import {ItemCategoryService} from '../item-category.service';

@Component({
  selector: 'app-item-category-list',
  templateUrl: './item-category-list.component.html',
  styleUrls: ['./item-category-list.component.css']
})
export class ItemCategoryListComponent implements OnInit {
  itemCategories;
  constructor(private itemCatService: ItemCategoryService) { }

  ngOnInit() {
    this.itemCatService.getItemCategories().subscribe(itemCats => {
      this.itemCategories = itemCats;
    });
  }

}
