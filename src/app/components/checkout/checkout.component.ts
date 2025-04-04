import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CartItem } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import axios from 'axios';
declare var bootstrap: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, NavbarComponent,FormsModule, FooterComponent, RouterModule, HttpClientModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  selectedPayment: string = 'card';
  isformsubmit: boolean = false;
  cartItems: CartItem[] = [];
  isEmptyCart: Boolean = false;
  total: number = 0;
  private cartSubscription!: Subscription;
  stripe: any = null;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardError: any = null;

  shippingDetails = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  };

  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
      if (this.cartItems.length === 0) {
        // confirm("Your cart is empty please add products in your cart first!")
        // this.router.navigate(['/products']);
        this.isEmptyCart = true;
      }
    });

    this.stripe = await loadStripe('pk_live_51R4uyFFjJPqQAJtk75pzMIwoTUQecKxgU1BTDVnio8C9a5bbcwep4bxAS0mFIibtZP1dZV5iXmyejGwdpMarr2IR00GLof2GtD');
    // this.stripe = await loadStripe('pk_test_51R5G37Qj3i4cL8ileMmZYGGGYd2eoF9pknfhI2uNe3MK0FEhH6g7sfeZkshQHV1N8myCrQctuyb3fXC8RLYy0MZT00g4Jm8bJZ');

    if (this.stripe) {
      const elements = this.stripe.elements();

      this.cardNumber = elements.create('cardNumber', { style: { base: { fontSize: '16px' } } });
      this.cardExpiry = elements.create('cardExpiry', { style: { base: { fontSize: '16px' } } });
      this.cardCvc = elements.create('cardCvc', { style: { base: { fontSize: '16px' } } });

      this.cardNumber.mount('#card-number-element');
      this.cardExpiry.mount('#card-expiry-element');
      this.cardCvc.mount('#card-cvc-element');

      this.cardNumber.on('change', (event: any) => {
        this.cardError = event.error ? event.error.message : null;
      });
      this.cardExpiry.on('change', (event: any) => {
        this.cardError = event.error ? event.error.message : null;
      });
      this.cardCvc.on('change', (event: any) => {
        this.cardError = event.error ? event.error.message : null;
      });
    }
  }

  switchPayment(method: string) {
    this.selectedPayment = method;

    const cardSection = new bootstrap.Collapse('#creditCardSection', { toggle: false });
    const venmoSection = new bootstrap.Collapse('#venmoSection', { toggle: false });

    if (method === 'card') {
      cardSection.show();
      venmoSection.hide();
    } else {
      cardSection.hide();
      venmoSection.show();
    }
  }

  handlePayment(form: NgForm) {
    if (form.invalid) {
      alert('Please fill in all required fields.');
      return;
    }
    this.isformsubmit = true;
  
    if (this.selectedPayment === 'card') {
      this.processCardPayment();
    } else {
      this.processVenmoPayment();
    }
  }
  
  async processCardPayment() {
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardNumber,
      billing_details: {
        name: this.shippingDetails.fullName,
        email: this.shippingDetails.email,
        phone: this.shippingDetails.phone,
        address: {
          city: this.shippingDetails.city,
          postal_code: this.shippingDetails.zip,
          line1: this.shippingDetails.address,
        },
      },
    });    
    if (error) {
      this.isformsubmit = false;
      this.cardError = error.message;
    } else {
      const orderData = {
        paymentMethodId: paymentMethod.id,
        shippingDetails: this.shippingDetails,
        cartItems: this.cartItems,
        totalAmount: this.total,
      };
      try {
        const response = await axios.post("https://stripe-apis.vercel.app/api/coffee/stripe/coffee_order", orderData);
        localStorage.removeItem('cart');
        this.cartService.clearCart();
        this.router.navigate(['/success'], { state: { paymentSuccess: true } });
        this.isformsubmit = false;
        
      } catch (error) {
        this.isformsubmit = false;
        console.log("Error While payment");
        alert("Something went wrong during payment plz try again")
        
      }
    }
  }
  
  processVenmoPayment() {

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
}
