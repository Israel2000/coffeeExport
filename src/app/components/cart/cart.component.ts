import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, FooterComponent, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  total: number = 0;
  private cartSubscription!: Subscription;
  private handler: any = null;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to cart items and calculate total
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });

    // Load Stripe checkout
    this.loadStripe();
  }

  ngOnDestroy() {
    // Prevent memory leaks by unsubscribing
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
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

  pay(amount: number) {    
    if (!this.handler) {
      console.error('Stripe handler is not initialized.');
      return;
    }

    this.handler.open({
      name: 'Demo Site',
      description: 'Purchase Items',
      amount: amount * 100,
      token: (token: any) => { 
        console.log('Payment successful:', token);
        
        // Move clearing cart only after payment success
        localStorage.removeItem('cart');
        this.cartService.clearCart();
        
        // Navigate to products page
        this.router.navigate(['/products']);

        // Notify user
        alert('Payment Successful!');
      }
    });
  }
  
  loadStripe() {     
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51R5gPtBasuZF1zTnR6dD3LVtCcxsCec1FphAfOoIkz1YoSHJoAjEvRy3UZUXooq7eE2z6UntMOa8RaUHoOzkFAl900AjItI8Ty',
          locale: 'auto'
        });
      };
       
      window.document.body.appendChild(script);
    }
  }
}
