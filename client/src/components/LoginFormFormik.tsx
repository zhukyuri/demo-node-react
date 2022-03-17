import { Formik, FormikValues } from 'formik';
import * as yup from 'yup';
import { Box, Button, Container, Link, Stack, TextField } from '@mui/material';
import { AuthStatus } from '../store/Store';
import React, { useContext } from 'react';
import { Context } from '../index';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(5, 'Password should be of minimum 5 characters length')
    .max(10, 'Password should be of maximum 10 characters length')
    .required('Password is required'),
});

const initialValues = {
  email: process.env.REACT_APP_DEFAULT_EMAIL,
  password: process.env.REACT_APP_DEFAULT_PASSWORD,
}

const LoginFormFormik = () => {
  const { store } = useContext(Context)

  const handleSetRegistration = () => {
    store.setAuthStatus(AuthStatus.RegistrationForm)
  }

  const handleLogin = async (values: FormikValues) => {
    await store.login(values.email, values.password)
  }

  return (
    <Container maxWidth="sm">
      <Box
        component="div"
        sx={{
          marginTop: 10,
          '& .MuiTextField-root': { m: 1, width: 300 },
        }}
      >
        <h1>Login Form</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={validationSchema}
        >
          {({
              isSubmitting,
              touched,
              dirty,
              isValid,
              isValidating,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setSubmitting,
              validateField,
              validateForm,
            }) => {
            return (
              <form>
                <Stack spacing={2}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email || ' '}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    // type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password || ' '}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={!isValid}
                    onClick={() => handleLogin(values)}
                  >Login</Button>
                  <Link
                    component="button"
                    onClick={handleSetRegistration}
                  >Registration Form</Link>
                </Stack>
              </form>
            )
          }}
        </Formik>
      </Box>
    </Container>
  );
};

export default LoginFormFormik;
