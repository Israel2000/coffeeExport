export interface Product {
    id: number;
    name: string;
    price: any;
    description: string;
    image: string;
    rating: number;
    reviews: number;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }