import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [NavbarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products = [
    {
      name: 'Espresso Roast',
      description: 'Rich and bold, with a hint of caramel.',
      price: 12.99,
      image: 'assets/espresso.jpg'
    },
    {
      name: 'Colombian Blend',
      description: 'Smooth and aromatic, with a touch of cocoa.',
      price: 14.99,
      image: 'assets/colombian.jpg'
    },
    {
      name: 'French Vanilla',
      description: 'Sweet and creamy, a customer favorite.',
      price: 10.99,
      image: 'assets/vanilla.jpg'
    }
  ];
}

