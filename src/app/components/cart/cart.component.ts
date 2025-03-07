import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

interface CartItem {
  name: string;
  image: string;
  price: number;
  description: string;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItem: any = null;

  ngOnInit() {
    const storedItem = localStorage.getItem('cartItem');
    if (storedItem) {
      this.cartItem = JSON.parse(storedItem);
    }
  }

  removeItem() {
    localStorage.removeItem('cartItem');
    this.cartItem = null;
  }
  

}
