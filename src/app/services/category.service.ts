/*
import {AngularFirestore} from 'angularfire2/firestore';
import {Category} from './../models/category';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';

@Injectable()
export class CategoryService {
  categories$: Observable<Category[]>;

  constructor(private afs: AngularFirestore) {
    this.categories$ = afs.collection<Category>('categories').valueChanges();
  }

  getRef(key: string) {
    return this.afs.doc<Category>('categories/' + key);
  }

}
*/

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { category } from '../models/category';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {
  categoriesCollection: AngularFirestoreCollection<category>;
  categories: Observable<category[]>;

  constructor(public afs: AngularFirestore) {
    //this.categories = this.afs.collection('categories').valueChanges();
    afs.firestore.settings({ timestampsInSnapshots: true });
    this.categoriesCollection = this.afs.collection('categories');

    this.categories = this.categoriesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as category;
        //commented out to try
        data.id = a.payload.doc.id;  
        return data;
      });
    });
   }

  getCategories(){
    return this.categories;
  } 

  addItem(category : category){
    this.categoriesCollection.add(category);
  }

  getRef(key: string) {
    return this.afs.doc<category>('categories/' + key);
  }
}