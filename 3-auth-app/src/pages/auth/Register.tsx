import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomTextField from '../../components/CustomTextField';
import { Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router';
import CustomCheckbox from '../../components/CustomCheckbox';
import useAuthActions from '../../redux/auth/useAuthActions';

const formValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(
      /\.(com|net|org|in)$/,
      'Email must end with ".com", ".net", ".org", or ".in"'
    )
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match') // Ensure it matches the password field
    .required('Confirm Password is required'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions'),
});

const RegisterPage = () => {
  const { register, resetLoginForm } = useAuthActions();
  const navigate = useNavigate();

  const defaultRegisterValues: FormRegisterValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  };

  /* const formik = useFormik({
    initialValues: formData, // Initialize form with Redux state
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      dispatch(updateForm(values)); // Update Redux state with form values
      alert('Form data saved to Redux!');
    },
  }); */

  const handleRegisterSubmit = () => {
    register(navigate); // Save data to Redux state
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
        Form with MUI and Formik
      </Typography>
      <Formik
        initialValues={defaultRegisterValues}
        validationSchema={formValidationSchema}
        onSubmit={handleRegisterSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <Box mb={2}>
              <CustomTextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
              />
            </Box>
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
            <Box mb={2}>
              <CustomTextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <CustomCheckbox
                name="agreeToTerms"
                label="I agree to the terms and conditions"
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginRight: 2 }}
                disabled={isSubmitting}
              >
                Register
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
            onClick={() => navigate('/')}
          >
            Go to Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
