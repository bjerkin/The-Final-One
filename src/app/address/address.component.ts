import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AddressModel} from '../models/Address-Model';
import {Observable} from 'rxjs/Observable';
import {Product} from '../models/product';
import {ActivatedRoute} from '@angular/router';
import {AddressService} from '../services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  an: any[] = [];
  uid: string;
  addressname: string;
  address: AddressModel = <AddressModel> {};
  Address$: Observable<AddressModel[]>;
  key: string;

  constructor(public ad: AddressService,  public af: AngularFireAuth, private route: ActivatedRoute) {
    this.af.auth.onAuthStateChanged((user) => {
        if (user != null) {
          this.uid = user.uid;
        }
      }
    );
    this.Address$ = ad.getAll();

  }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    if (key) {
      this.key = key;
      this.ad.get(key).take(1).subscribe(address => {
        this.address = address;
      });
    }
  }


  createaddress() {
    const hey = this.address;
    this.an.length = 0;
    if (this.addressname.length > 4) {
      this.an.push(this.addressname);
      hey.address = this.an;
      hey.uid = this.uid;
      this.ad.save(hey);
    }
  }
}
