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

  private saveCartToLocalStorage(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCartCount(): any {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart).length : 0;
  }

  updateCartCount() {
    const updatedCart = this.loadCartFromLocalStorage(); 
    this.cartItems.next(updatedCart); 
  }
  

  addToCart(product: Product, quantity: number = 1) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }

    this.cartItems.next([...currentItems]);
    this.saveCartToLocalStorage(currentItems); 
  }

  removeFromCart(productId: number) {
    const updatedItems = this.cartItems.getValue().filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems);
    this.saveCartToLocalStorage(updatedItems);
    this.updateCartCount();
  }
  
  updateQuantity(productId: number, quantity: number) {
    const updatedItems = this.cartItems.getValue().map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    this.cartItems.next(updatedItems);
    this.saveCartToLocalStorage(updatedItems); // ✅ Save to localStorage
  }

  getTotal(): number {
    return this.cartItems.getValue().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getAllProducts(): CartItem[] {
    return this.cartItems.getValue();
  }

  clearCart() {
    this.cartItems.next([]);
    localStorage.removeItem('cart'); // ✅ Clear localStorage
  }
}
