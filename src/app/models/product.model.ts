export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    rating: number;
    reviews: number;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }