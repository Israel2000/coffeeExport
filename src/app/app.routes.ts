import { provideRouter, RouterModule, Routes } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { InsightpageComponent } from './components/insightpage/insightpage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
 
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'insight', component: InsightpageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'insight/:productName', component: InsightpageComponent },

];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
  };