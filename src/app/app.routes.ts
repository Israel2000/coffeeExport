import { provideRouter, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ApplicationConfig } from '@angular/core';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'products', component: ProductsComponent } 
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
  };