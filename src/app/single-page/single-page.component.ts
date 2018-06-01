import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.css']
})
export class SinglePageComponent implements OnInit {
  product: Observable<Product>;
  title1: string;
  price1: number;
  desc1: string;
  url: string;
  category1: string;

  constructor(public productService: ProductService, private route: ActivatedRoute) {
    const key = this.route.snapshot.paramMap.get('key');
    productService.get(key).subscribe(pro =>
      this.title1 = pro.title);
    productService.get(key).subscribe(pro1 =>
      this.price1 = pro1.price);
    productService.get(key).subscribe(pro3 =>
      this.desc1 = pro3.desc);
    productService.get(key).subscribe(pro3 =>
      this.url = pro3.imageUrl);
    // productService.get(key).subscribe(pro3 =>
    //   this.category1 = pro3.category.id);
    // console.log(this.category1);
    // productService.getCategory(this.category1).subscribe(cate =>
    //   this.categoryName = cate.id);
    // console.log(this.categoryName);}
  }

  ngOnInit() {

  }

}
