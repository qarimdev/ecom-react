export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  shippingAddress: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

export interface ShippingInfo {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}
