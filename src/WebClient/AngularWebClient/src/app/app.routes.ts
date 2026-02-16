import { Routes } from '@angular/router';
import { HomeComponent } from '@features/home/home.component';
import { ProductsComponent } from '@features/products/products.component';
import { ProductDetailComponent } from '@features/products/product-detail.component';
import { CartComponent } from '@features/cart/cart.component';
import { CheckoutComponent } from '@features/checkout/checkout.component';
import { ConfirmationComponent } from '@features/orders/confirmation.component';
import { OrdersComponent } from '@features/orders/orders.component';
import { ContactComponent } from '@features/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home' },
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'Products' },
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    data: { title: 'Product Details' },
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Shopping Cart' },
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { title: 'Checkout' },
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
    data: { title: 'Order Confirmation' },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    data: { title: 'My Orders' },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contact Us' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
