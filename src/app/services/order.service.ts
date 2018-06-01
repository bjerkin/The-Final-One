import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFirestoreDocument} from 'angularfire2/firestore/document/document';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFirestoreCollection} from 'angularfire2/firestore/collection/collection';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {orderp} from '../models/orderp';

@Injectable()
export class OrderService {
  private orders: AngularFirestoreCollection<orderp>;
  constructor(private afs: AngularFirestore) {
    this.orders = afs.collection<orderp>('orders');
  }

  add(order: orderp) {
    return this.orders.add(order).then(reference => {
      // order.key = reference.id;
      this.update(reference.id, order);
    });
  }

  getAll(): Observable<orderp[]> {
    return this.orders.valueChanges();
  }

  get(key): Observable<orderp> {
    return <any>this.orders.doc(key).valueChanges();
  }

  fromRef(ref: firebase.firestore.DocumentReference): Observable<orderp> {
    return this.afs.doc<orderp>(ref.path).valueChanges();
  }

  getRef(key): AngularFirestoreDocument<orderp> {
    return this.orders.doc(key);
  }

  update(key: string, order: orderp): Promise<void> {
    return this.orders.doc(key).update(order);
  }

  save(order: orderp) {
    this.add(order);
  }
}
