import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { category } from '../../models/category';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
   
  styleUrls: ['./admin-add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  Category: category = {
    title:'',
    id:''
  }

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.Category.title != ''){
      this.categoryService.addItem(this.Category);
      this.Category.title = '';
    }
  }

}
