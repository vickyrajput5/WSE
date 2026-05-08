import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../../types';
import { loadCart } from '../../services/storage';
import type { RootState } from '../index';

interface CartState {
  items: CartItem[];
  isHydrated: boolean;
}

const initialState: CartState = {
  items: [],
  isHydrated: false,
};

export const hydrateCart = createAsyncThunk('cart/hydrate', async () => {
  const items = await loadCart();
  return items;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const existing = state.items.find((item) => item.product.id === action.payload.product.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push({ product: action.payload.product, quantity: action.payload.quantity });
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((entry) => entry.product.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((entry) => entry.product.id === action.payload);
      if (!item) {
        return;
      }
      item.quantity -= 1;
      if (item.quantity <= 0) {
        state.items = state.items.filter((entry) => entry.product.id !== action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateCart.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isHydrated = true;
    });
    builder.addCase(hydrateCart.rejected, (state) => {
      state.isHydrated = true;
    });
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0);
