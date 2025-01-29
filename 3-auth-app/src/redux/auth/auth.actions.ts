import axiosInstance from '../../config/axiosInstance';
import { AppDispatch } from '../store';
import {
  setLoginFailure,
  setLoginStart,
  setLoginSuccess,
  setLogout,
} from './auth.slice';

export const postRegister = (navigate: (path: string) => void) => {
  alert('Data saved successfully!');
  navigate('/');
};

export const postLogin =
  (formValues: LoginFormValues, navigate: (path: string) => void) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoginStart());

    try {
      const { email, password } = formValues;
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });

      dispatch(setLoginSuccess({ token: response.data.token, email }));

      // Save token and email in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', email);
      alert('Form submitted successfully!');
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(setLoginFailure(error.message));
      } else {
        dispatch(setLoginFailure('An unknown error occurred'));
      }
    }
  };

export const resetAuthState = () => (dispatch: AppDispatch) => {
  dispatch(setLogout());

  // Clear localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('email');
};
