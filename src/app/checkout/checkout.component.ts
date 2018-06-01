import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {CartItem, ShoppingCartService} from '../services/shopping-cart.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product';
import {UserService} from '../services/user.service';
import 'rxjs/add/operator/take';
import {AngularFireAuth} from 'angularfire2/auth';
import {AddressModel} from '../models/Address-Model';
import {orderp} from '../models/orderp';
import {OrderService} from '../services/order.service';
import {AddressService} from '../services/address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  key: string;
  itemsasarray: any[] = [];
  itemnumber: number [] = [];
  ordered: orderp = <orderp> {};
  items$: Observable<CartItem[]>;
  ite: CartItem = <CartItem> {};
  cartTotal$: Observable<number>;
  product: Product = <Product>{};
  uid: string;
  nu: number;
  lim: number;
  checked: boolean;
  Address$: Observable<AddressModel[]>;
  str: string;

  constructor(public productService: ProductService, private cart: ShoppingCartService, private router: Router, private ord: OrderService, private route: ActivatedRoute, private user: UserService, public af: AngularFireAuth, public ad: AddressService) {
    this.items$ = cart.getItems();
    this.itemsasarray = cart.getarrayitems();
    this.nu = 0;
    this.lim = 0;
    this.checked = false;
    this.Address$ = ad.getAll();
    this.itemnumber = cart.getitemnumber();
    this.Address$ = ad.getAll().map(adresses => adresses.filter(p => p.uid === this.uid));
    this.str = '  ';

    this.cartTotal$ = this.items$.switchMap(items => {
      this.lim += 1;
      return Observable.from(items).mergeMap(line => {
        return this.productService.fromRef(line.product).take(1).map(product => product.price * line.amount);
      }).reduce((acc, x) => acc + x, 0);
    });

    this.af.auth.onAuthStateChanged((user) => {
        if (user != null) {
          this.uid = user.uid;

        }
      }
    );
  }
  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    if (key) {
      this.key = key;
      this.ord.get(key).take(1).subscribe(ordered => {
        this.ordered = ordered;
      });
    }
  }
  // trackByFn(index, item: CartItem) {
  //   return item.product != null ? item.product.id : null;
  // }

  updateItem(product: firebase.firestore.DocumentReference, amount: number) {
    if (this.checked === true) {
      this.cart.setItemfinal(product.id, +amount);
      this.nu += 1;
    }
  }

  checkout() {
    this.checked = true;
    const order = this.ordered;
    order.id = this.uid;
    order.products = this.itemsasarray;
    this.ord.save(order);
    this.cart.removeallItems();
    this.router.navigateByUrl('');
  }

  trackByFn(index, item: CartItem) {
    return item.product != null ? item.product.id : null;
  }

}
