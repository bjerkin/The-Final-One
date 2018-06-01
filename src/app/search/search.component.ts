import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // products$: Observable<Product[]>;
  // filteredProducts$: Observable<Product[]>;

  // constructor(products: ProductService) {
  //   this.products$ = products.getAll();
  // }
  leng: number;

  trackByFn(product: any) {
    return product != null ? product.key: null;
  }
  ngOnInit() {}
  p: number = 1;
  max: number = 3;


  // filteredProducts: Product[];
  // method(){
  //   this.filteredProducts = this.products$;
  // }

   products: Product[];
  filteredProducts: Product[];
  subscription:Subscription;

  constructor(private productService:ProductService) {
    this.subscription=this.productService.getAll()
    .subscribe(products=>{this.products=products;
   ;

    });
   }
   ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  search(query: string){

    this.filteredProducts = (query) ?
    this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):
    null;
    this.filteredProducts.sort((p1,p2) => p1.title.charCodeAt(0)-p2.title.charCodeAt(0));
    this.leng = this.filteredProducts.length;
  }
}

