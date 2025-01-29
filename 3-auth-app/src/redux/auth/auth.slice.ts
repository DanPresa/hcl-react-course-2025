import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Retrieve initial state from localStorage
const token = localStorage.getItem('token');
const email = localStorage.getItem('email');

const initialState: AuthState = {
  isAuthenticated: !!token, // If a token exists, user is authenticated
  user: token ? { email: email || '' } : null,
  token: token || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setLoginSuccess: (state, action: PayloadAction<UserAuthenticated>) => {
      const { token, email } = action.payload;

      state.loading = false;
      state.isAuthenticated = true;
      state.user = { email: email };
      state.token = token;
    },
    setLoginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
});

export const authSelector = (state: RootState) => state.auth;
export const { setLoginStart, setLoginSuccess, setLoginFailure, setLogout } =
  authSlice.actions;
export default authSlice.reducer;
