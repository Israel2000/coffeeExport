import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: "Espresso",
      price: 7.49,
      description: "Espresso is a strong, rich coffee made by forcing hot water through finely-ground coffee beans.",
      image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400",
      rating: 4.7,
      reviews: 105
    },
    {
      id: 2,
      name: "Latte",
      price: 4.49,
      description: "Latte is a creamy coffee drink made with espresso and steamed milk.",
      image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400",
      rating: 4.7,
      reviews: 105
    },
    {
      id: 3,
      name: "Cappuccino",
      price: 4.49,
      description: "Cappuccino is a strong, rich coffee made by forcing hot water through finely-ground coffee beans.",
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400",
      rating: 4.7,
      reviews: 105
    },
    {
      id: 4,
      name: "Americano",
      price: 4.49,
      description: "Americano is a creamy coffee drink made with espresso and steamed milk.",
      image: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=400",
      rating: 4.7,
      reviews: 105
    },
    {
      id: 5,
      name: "Mocha",
      price: 4.49,
      description: "Mocha is a strong, rich coffee made by forcing hot water through finely-ground coffee beans.",
      image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400",
      rating: 4.7,
      reviews: 105
    },
    {
      id: 6,
      name: "Macchiato",
      price: 4.49,
      description: "Macchiato is a creamy coffee drink made with espresso and steamed milk.",
      image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400",
      rating: 4.7,
      reviews: 105
    },
    {
      id: 7,
      name: "Flat White",
      price: 4.49,
      description: "Flat White is a creamy coffee drink made with espresso and steamed milk.",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400",
      rating: 4.7,
      reviews: 105
    }
  ];

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductByName(name: string): Observable<Product | undefined> {
    const product = this.products.find(p => p.name.toLowerCase() === name.toLowerCase());
    return of(product);
  }
}
