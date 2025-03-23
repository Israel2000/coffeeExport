import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>(this.loadCartFromLocalStorage());
  cartItems$ = this.cartItems.asObservable();

  constructor() {}

  private loadCartFromLocalStorage(): CartItem[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  private saveAndEmit(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItems.next(cart);
  }

  getCartCount(): number {
    return this.cartItems.getValue().length;
  }

  updateCartCount() {
    this.cartItems.next(this.loadCartFromLocalStorage());
  }

  addToCart(product: Product, quantity: number = 1) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }

    this.saveAndEmit(currentItems);
  }

  removeFromCart(productId: number) {
    const updatedItems = this.cartItems.getValue().filter(item => item.product.id !== productId);
    this.saveAndEmit(updatedItems);
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) {
      this.removeFromCart(productId);
      return;
    }

    const updatedItems = this.cartItems.getValue().map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );

    this.saveAndEmit(updatedItems);
  }

  getTotal(): number {
    return this.cartItems.getValue().reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getAllProducts(): CartItem[] {
    return this.cartItems.getValue();
  }

  clearCart() {
    this.saveAndEmit([]);
  }
}
