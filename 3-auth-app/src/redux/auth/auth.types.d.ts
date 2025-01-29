interface UserAuthenticated {
  email: string;
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
  user: { email: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
