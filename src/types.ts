/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'Bóng đá' | 'Gym' | 'Chạy bộ' | 'Bơi lội' | 'Tennis' | 'Bóng rổ' | 'Yoga' | 'Cầu lông' | 'Golf' | 'Võ thuật' | 'Đạp xe' | 'Pickleball' | 'Skateboard' | 'Thời trang' | 'Phụ kiện' | 'Khác';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: Category;
  brand: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  numReviews: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  productId: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
  };
  paymentMethod: 'COD' | 'Banking';
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}
