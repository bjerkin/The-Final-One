import { Component, OnInit } from '@angular/core';
import { CategoryService} from '../services/category.service';
import { FirebaseApp } from 'angularfire2';
import { category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: category[];

  constructor(public categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories =>{
      //console.log(categories);
      this.categories = categories;
    });
  }
}
