import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}
  handler:any = null;

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
    this.loadStripe();
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

  pay(amount: any) {    
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token: (token: any) => { 
        console.log(token);
        localStorage.removeItem('cart');
        this.router.navigate(['/products']);
        this.cartService.updateCartCount();
      }
    });
  
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });
  }
  
  loadStripe() {     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          // plz israel use here your own stripe test key
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
}