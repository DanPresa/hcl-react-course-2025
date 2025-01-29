import useAuthActions from '../../redux/auth/useAuthActions';
import { useNavigate } from 'react-router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Box, Typography, CircularProgress, Link } from '@mui/material';
import CustomTextField from '../../components/CustomTextField';

const formValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .matches(
      /\.(com|net|org|in)$/,
      'Email must end with ".com", ".net", ".in", or ".org"'
    )
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginPage = () => {
  const { loading, error, login, resetLoginForm } = useAuthActions();
  const navigate = useNavigate();

  const defaultValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values: LoginFormValues) => {
    console.log(values);
    login(values, navigate); // Save data to Redux state
  };

  const handleReset = (resetFormData: () => void) => {
    resetFormData(); // Reset Formik form
    resetLoginForm(); // Reset Redux state
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Form with MUI and Formik{' '}
      </Typography>
      {loading && <CircularProgress />}
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}

      <Formik
        initialValues={defaultValues}
        validationSchema={formValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <Box mb={2}>
              <CustomTextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <CustomTextField
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginRight: 2 }}
                disabled={loading || isSubmitting}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                type="button"
                onClick={() => handleReset(resetForm)}
              >
                Reset
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          Already have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/register')}
          >
            Go to Register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
