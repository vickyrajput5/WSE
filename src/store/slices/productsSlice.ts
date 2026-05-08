import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../assets/data/products';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: products,
  },
  reducers: {},
});

export const productsReducer = productsSlice.reducer;
