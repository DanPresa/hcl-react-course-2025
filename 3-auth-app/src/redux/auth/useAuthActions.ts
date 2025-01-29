import { useAppDispatch, useAppSelector } from '../hooks';
import { postLogin, postRegister, resetAuthState } from './auth.actions';
import { authSelector } from './auth.slice';

const useAuthActions = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(authSelector);

  const register = (navigate: (path: string) => void) => {
    postRegister(navigate);
  };

  const login = (
    formValues: LoginFormValues,
    navigate: (path: string) => void
  ) => {
    dispatch(postLogin(formValues, navigate));
  };

  const resetLoginForm = () => {
    dispatch(resetAuthState());
  };

  return {
    loading,
    error,
    login,
    register,
    resetLoginForm,
  };
};

export default useAuthActions;
