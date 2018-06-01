import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreDocument } from 'angularfire2/firestore/document/document';
import { AngularFirestoreCollection } from 'angularfire2/firestore/collection/collection';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import {CartItem} from './shopping-cart.service';
import {AddressModel} from '../models/Address-Model';



export interface ShoppingCart {
  key: string;
  items: AngularFirestoreCollection<CartItem>;
}

@Injectable()
export class AddressService {
  private adresses: AngularFirestoreCollection<AddressModel>;
  private uid: string;

  constructor(private afs: AngularFirestore, private af: AngularFireAuth) {
    this.af.auth.onAuthStateChanged((user) => {
        if (user != null) {
          this.uid = user.uid;
        }
      }
    );
    this.adresses = afs.collection<AddressModel>('address');

  }

  add(address: AddressModel) {
    return this.adresses.add(address).then(reference => {
      address.key = reference.id;
      this.update(reference.id, address);
    });
  }
  getAll(): Observable<AddressModel[]> {
    return this.adresses.valueChanges();
  }

  get(key): Observable<AddressModel> {
    return <any>this.adresses.doc(key).valueChanges();
  }

  fromRef(ref: firebase.firestore.DocumentReference): Observable<AddressModel> {
    return this.afs.doc<AddressModel>(ref.path).valueChanges();
  }

  getRef(key): AngularFirestoreDocument<AddressModel> {
    return this.adresses.doc(key);
  }

  update(key: string, address: AddressModel): Promise<void> {
    return this.adresses.doc(key).update(address);
  }

  save(address: AddressModel) {
    // if (address.key) {
    //   return this.update(address.key, address);
    // } else {
    this.add(address);
    // }
  }
  remove(key: string): Promise<void> {
    return this.adresses.doc(key).delete();
  }
}





