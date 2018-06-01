import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Product } from './../models/product';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
@Pipe({
  name: 'truncate'
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input('product') product: Product;
  subscription: Subscription;
  ordered = 0;
  percent = 0;
  @Input() limit: number = 20;
  truncating = true;
  len: number;


  constructor(private cart: ShoppingCartService) { }

  ngOnInit() {
    if (this.product.key) {
      this.subscription = this.cart.getItem(this.product.key).subscribe(cartItem => {
        if (cartItem !== null) this.ordered = cartItem['amount'];
        this.len = this.product.desc.length;
      });
    }
    if (this.product.onSale) {
      this.percent = this.product.oldPrice - this.product.price;
      this.percent = (this.percent / this.product.oldPrice) * 100;
    }
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  increase(){
    if(this.ordered < this.product.amount) {
      this.ordered++;
      this.amountChanged();
    }
  }

  decrease(){
    if (this.ordered > 0) {
      this.ordered--;
      this.amountChanged();
    }
  }

  amountChanged(){
    if(this.product.key){
      this.cart.setItem(this.product.key, this.ordered);
    }
  }
}
