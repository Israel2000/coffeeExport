import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-insightpage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FormsModule],
  providers: [ProductService, CartService],
  templateUrl: './insightpage.component.html',
  styleUrl: './insightpage.component.css'
})
export class InsightpageComponent implements OnInit {
  product?: Product;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const productName = this.route.snapshot.paramMap.get('name');
    if (productName) {
      this.productService.getProductByName(productName).subscribe(product => {
        if (product) {
          this.product = product;
        }
      });
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.router.navigate(['/cart']);
    }
  }
}