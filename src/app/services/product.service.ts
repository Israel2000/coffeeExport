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
      name: "Sidama",
      price: 9.99,
      description: "known for its bright, citrusy, and floral notes, with a medium body and smooth finish",
      image: "/assets/images/sidama-Beans.png", 
      rating: 4.9,
      reviews: 4
    },
    {
      id: 2,
      name: "Ethiopian Yirgacheffe",
      price: 8.99,
      description: "Known for Blueberry, chocolate, floral flavor Cane sugar.",
      image: "/assets/images/comingsoon.jpg",
      rating: 4.8,
      reviews: 5
    },
    {
      id: 3,
      name: "Guji",
      price: 7.99,
      description: "Known for Floral, Green tea, Can sugar, Lime, and White grape flavor",
      image: "/assets/images/comingsoon.jpg",
      rating: 4.7,
      reviews: 105
    },
    // {
    //   id: 4,
    //   name: "Americano",
    //   price: 4.49,
    //   description: "Americano is a creamy coffee drink made with espresso and steamed milk.",
    //   image: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=400",
    //   rating: 4.7,
    //   reviews: 105
    // },
    // {
    //   id: 5,
    //   name: "Mocha",
    //   price: 4.49,
    //   description: "Mocha is a strong, rich coffee made by forcing hot water through finely-ground coffee beans.",
    //   image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400",
    //   rating: 4.7,
    //   reviews: 105
    // },
    // {
    //   id: 6,
    //   name: "Macchiato",
    //   price: 4.49,
    //   description: "Macchiato is a creamy coffee drink made with espresso and steamed milk.",
    //   image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400",
    //   rating: 4.7,
    //   reviews: 105
    // },
    // {
    //   id: 7,
    //   name: "Flat White",
    //   price: 4.49,
    //   description: "Flat White is a creamy coffee drink made with espresso and steamed milk.",
    //   image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400",
    //   rating: 4.7,
    //   reviews: 105
    // }
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
