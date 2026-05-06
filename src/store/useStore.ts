import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User } from '../types';

interface CartState {
  cartItems: CartItem[];
  addItem: (product: Product, quantity: number, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addItem: (product, quantity, size, color) => {
        const currentItems = get().cartItems;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.productId === product.id && item.size === size && item.color === color
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ cartItems: updatedItems });
        } else {
          set({
            cartItems: [
              ...currentItems,
              {
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.images[0],
                quantity,
                size,
                color,
              },
            ],
          });
        }
      },
      removeItem: (productId, size, color) => {
        set({
          cartItems: get().cartItems.filter(
            (item) => !(item.productId === productId && item.size === size && item.color === color)
          ),
        });
      },
      updateQuantity: (productId, size, color, quantity) => {
        const updatedItems = get().cartItems.map((item) => {
          if (item.productId === productId && item.size === size && item.color === color) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ cartItems: updatedItems });
      },
      clearCart: () => set({ cartItems: [] }),
      totalPrice: () => get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      itemCount: () => get().cartItems.reduce((total, item) => total + item.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
);

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'auth-storage' }
  )
);
