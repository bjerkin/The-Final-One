import {ShoppingCartService} from './services/shopping-cart.service';
import {ProductService} from './services/product.service';
import {CategoryService} from './services/category.service';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';
import {UserService} from './services/user.service';
import {AuthGuard} from './guards/auth-guard.service';
import {AuthService} from './services/auth.service';
import {environment} from './../environments/environment';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ProductsComponent} from './products/products.component';
import {CartComponent} from './cart/cart.component';
import {LoginComponent} from './login/login.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {OrdersComponent} from './orders/orders.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {AdminProductFormComponent} from './admin/admin-add-product/admin-add-product.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {DocPipe} from './doc.pipe';
import {AppRoutingModule} from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchComponent } from './search/search.component';
import {AddCategoryComponent} from './admin/admin-add-category/admin-add-category.component';
import { TruncateTextPipe } from './truncate-text.pipe';
import { SinglePageComponent } from './single-page/single-page.component';
import { AddressComponent } from './address/address.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {AddressService} from './services/address.service';
import {OrderService} from './services/order.service';

class CoreModule {
}

@NgModule({
  declarations: [
    AddCategoryComponent,
    AppComponent,
    NavbarComponent,

    ProductsComponent,
    CartComponent,
    LoginComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    OrdersComponent,
    AccessDeniedComponent,
    AdminProductFormComponent,
    ProductCardComponent,
    DocPipe,
    SearchComponent,
    TruncateTextPipe,
    SinglePageComponent,
    AddressComponent,
    CheckoutComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
    CustomFormsModule,
    RouterModule],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    DocPipe,
    AddressService,
    OrderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule,
               private afs: AngularFirestore ) {

    const settings = { timestampsInSnapshots: true };
    afs.app.firestore().settings( settings );
      afs.app.firestore().enablePersistence();


  }

}
