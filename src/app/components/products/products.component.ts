import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { Router } from '@angular/router';
import { CartService } from '../../cart.service';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

// import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterModule, FooterComponent ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(private cartService: CartService) {}

  addToCart(productTitle: string, price: number, quantityId: string) {
    const quantityElement = document.getElementById(quantityId) as HTMLInputElement;
    const quantity = quantityElement ? parseInt(quantityElement.value, 10) : 1;

    const product = {
      title: productTitle,
      price: price,
      quantity: quantity,
    };

    this.cartService.addToCart(product);
    console.log('Cart:', this.cartService.getCartItems());
  }
  

}

