import React from 'react';
import { Formik, FormikValues } from 'formik';
import * as yup from 'yup';
import { Box, Button, Container, Link, Stack, TextField } from '@mui/material';
import { AuthStatus } from '../store/Store';

const validationSchema = yup.object({
  username: yup
    .string()
    .min(5, 'Username should be of minimum 5 characters length')
    .max(10, 'Username should be of maximum 10 characters length')
    .required('Email is required'),
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
  username: process.env.REACT_APP_DEFAULT_USERNAME,
}

interface Props {
  setAuthStatus: (status: AuthStatus) => void;
  registration: (email: string, password: string, username: string) => Promise<void>
}

const RegistrationFormFormik = ({ setAuthStatus, registration }: Props) => {
  const handleRegistration = async (values: FormikValues) => {
    await registration(values.email, values.password, values.username)
  }

  const handleSetLoginForm = () => {
    setAuthStatus(AuthStatus.LoginForm);
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: 300 },
          marginTop: 10,
        }}
      >
        <h1>Registration Form</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleRegistration}
          validationSchema={validationSchema}
        >
          {({
              touched,
              isValid,
              handleChange,
              handleBlur,
              values,
              errors,
            }) => {
            return (
              <form>
                <Stack spacing={2}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && (errors.username || ' ')}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && (errors.email || ' ')}
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
                    helperText={touched.password && (errors.password || ' ')}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={!isValid}
                    onClick={() => handleRegistration(values)}
                  >Registration</Button>
                  <Link
                    component="button"
                    onClick={handleSetLoginForm}
                  >Login Form</Link>
                </Stack>
              </form>
            )
          }}
        </Formik>
      </Box>
    </Container>
  );
};

export default RegistrationFormFormik;
