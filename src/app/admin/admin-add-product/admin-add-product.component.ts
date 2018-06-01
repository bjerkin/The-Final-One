import {AngularFireStorage} from 'angularfire2/storage';
import {Product} from './../../models/product';
import {Router, ActivatedRoute} from '@angular/router';
import {ProductService} from './../../services/product.service';
import {category} from './../../models/category';
import {Observable} from 'rxjs/Observable';
import {CategoryService} from './../../services/category.service';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',

  styleUrls: ['./admin-add-product.component.css']
})
export class AdminProductFormComponent implements OnInit {
  key: string;
  product: Product = <Product>{};
  categoryKey: string;
  private asdf = false;

  categories: Observable<category[]>;

  constructor(
    private storage: AngularFireStorage,
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute) {
    this.categories = categoryService.categories;
  }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    if (key) {
      this.key = key;
      this.productService.get(key).take(1).subscribe(product => {
        this.product = product;
        this.categoryKey = product.category.id;
      });
    }
  }

  checking(event) {
    if (event.target.checked === true) {
      this.asdf = true;
      //this.product.oldPrice = this.product.price;
      //this.product.price = this.product.newPrice;
      //this.product.percent = this.product.oldPrice - this.product.price;
      //this.product.percent = (this.product.percent / this.product.oldPrice) * 100;
    } else {
      this.asdf = false;
    }
    if (event.target.checked === false) {
      this.product.price = this.product.oldPrice;
      //this.product.newPrice = 0;
      //this.product.newPrice = null;
      //this.product.percent = null;
    }
  }


  save(form: NgForm) {
    const product = this.product;

    product.category = <any>this.categoryService.getRef(form.value.category).ref;
    if (this.key) product.key = this.key;

    if (this.asdf === true) {
      this.product.oldPrice = this.product.price;
      this.product.price = this.product.newPrice;
    }

    this.productService.save(product);

    this.router.navigate(['admin/products']);
  }

  remove() {
    this.productService.remove(this.key);
    this.router.navigate(['admin/products']);
  }

  fileChanged(event) {
    const file = event.target.files[0];

    const filePath = 'newProducts/' + file.name;
    const task = this.storage.upload(filePath, file);

    task.downloadURL().take(1).subscribe(url => this.product.imageUrl = url);
  }
}
