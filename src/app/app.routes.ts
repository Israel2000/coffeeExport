import { provideRouter, RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { InsightpageComponent } from './components/insightpage/insightpage.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'insight', component: InsightpageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'checkout', component: CheckoutComponent },

  
  // { path: 'product/:name', component: InsightpageComponent },

  { path: 'insight/:name', component: InsightpageComponent },
  { path: 'cart', component: CartComponent }
];
