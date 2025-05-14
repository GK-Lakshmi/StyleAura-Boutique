
// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  discount: number;
  category: string;
  imageUrl: string;
  size: string[];
  sizes?: string[];
  colors?: string[];
  tags?: string[];
  available: boolean;
  inStock?: number;
}

// Order Types
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  date: string;
  shippingAddress?: ShippingAddress;
}

// User Types
export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  address?: Address;
  phone?: string;
}

// Announcement Type
export interface Announcement {
  id: string;
  message: string;
  timestamp: string;
  active: boolean;
}
