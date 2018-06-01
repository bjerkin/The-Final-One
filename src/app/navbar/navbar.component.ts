import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from './../models/app-user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private routeSub: Subscription;
  itemsInCart: number = 0;

  isCollapsed = true;
  user: AppUser;
  public isLoggedIn: boolean;
  public user_displayName: string;
  public sign_in: string;
  constructor(private authService: AuthService, private router: Router, cart: ShoppingCartService, af: AngularFireAuth) {
    af.auth.onAuthStateChanged((user) => {
        if (user != null) {
          this.isLoggedIn = true;
          this.user_displayName = user.displayName;
          this.sign_in = 'Sign Out';

        } else {
          this.isLoggedIn = false;
          this.sign_in = 'Sign In';
        }
      }
    );
    authService.user$.subscribe(user => {
      this.user = user;
    });
    cart.getItems().subscribe(items => {
      this.itemsInCart = items.reduce((sum, value) => sum + value.amount, 0);
    });
  }


  logout() {
    this.authService.logout().then(() => this.router.navigate(['']));
  }
}
