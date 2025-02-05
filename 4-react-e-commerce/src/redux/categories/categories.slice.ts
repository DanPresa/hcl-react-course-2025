import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: CategoriesState = {
  loading: false,
  categories: [],
  selectedCategory: '',
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.loading = false;
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const categoriesSelector = (state: RootState) => state.categories;
export const { setLoading, setCategories, setSelectedCategory, setError } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
