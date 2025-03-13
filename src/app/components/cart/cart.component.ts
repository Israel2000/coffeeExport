import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) {
      this.removeItem(productId);
    } else {
      this.cartService.updateQuantity(productId, quantity);
      this.total = this.cartService.getTotal();
    }
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.total = this.cartService.getTotal();
  }

  checkout() {
    alert('Checkout functionality will be implemented soon!');
  }
}
