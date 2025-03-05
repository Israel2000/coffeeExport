import { provideRouter, RouterModule, Routes } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '??', component: ContactComponent },

 
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
  };