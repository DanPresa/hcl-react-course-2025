interface User {
  email: string;
}

interface UserAuthenticated extends User {
  token: string;
}

interface FormRegisterValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

type LoginFormValues = Pick<FormRegisterValues, 'email' | 'password'>;

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
