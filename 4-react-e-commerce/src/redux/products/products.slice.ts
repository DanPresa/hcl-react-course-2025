import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: ProductsState = {
  loading: false,
  products: [],
  product: null,
  total: 0,
  skip: 0,
  limit: 0,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProducts: (state, action) => {
      const { products, total, skip, limit } = action.payload;

      state.loading = false;
      state.products = products;
      state.total = total;
      state.skip = skip;
      state.limit = limit;
    },
    setProduct: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productsSelector = (state: RootState) => state.products;
export const { setLoading, setProducts, setProduct, setError } =
  productSlice.actions;
export default productSlice.reducer;
