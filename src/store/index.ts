import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/productsSlice';
import { cartReducer } from './slices/cartSlice';
import { themeReducer } from './slices/themeSlice';
import { saveCart } from '../services/storage';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    theme: themeReducer,
  },
});

let cartBootstrapped = false;
let previousCartState = store.getState().cart.items;
store.subscribe(() => {
  if (!cartBootstrapped) {
    cartBootstrapped = true;
    return;
  }
  const currentCartState = store.getState().cart.items;
  if (currentCartState !== previousCartState) {
    previousCartState = currentCartState;
    void saveCart(currentCartState);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
