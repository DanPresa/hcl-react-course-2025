import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const favoritesSelector = (state: RootState) => state.favorites;
export const { setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
