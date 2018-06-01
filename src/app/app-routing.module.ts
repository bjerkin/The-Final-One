import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './guards/auth-guard.service';
import {CartComponent} from './cart/cart.component';
import {LoginComponent} from './login/login.component';
import {OrdersComponent} from './orders/orders.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {AdminProductFormComponent} from './admin/admin-add-product/admin-add-product.component';
import {ProductsComponent} from './products/products.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';
import {SearchComponent} from './search/search.component';
import { AddCategoryComponent } from './admin/admin-add-category/admin-add-category.component';
import {SinglePageComponent} from './single-page/single-page.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {AddressComponent} from './address/address.component';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'single-page/:key', component: SinglePageComponent},
  {path: 'cart', component: CartComponent},

  {path: 'login', component: LoginComponent},
  {path: 'search', component: SearchComponent},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/add',
    component: AdminProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/:key',
    component: AdminProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/categories',
    component: AddCategoryComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },

  {path: 'access-denied', component: AccessDeniedComponent},
  {path: 'access-denied', component: AddCategoryComponent},
  {path: 'cart/checkout', component: CheckoutComponent},
  {path: 'Address', component: AddressComponent}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

