import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {}

  addToCart(product: Product, quantity: number = 1) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { product, quantity }]);
    }
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next(currentItems.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    this.cartItems.next(updatedItems);
  }

  getTotal(): number {
    return this.cartItems.getValue().reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  clearCart() {
    this.cartItems.next([]);
  }
}