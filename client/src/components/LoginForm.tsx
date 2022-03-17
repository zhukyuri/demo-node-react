import React, { FC, useContext, useState } from 'react';
import { Context } from '../index';
import { Box, Button, Container, Stack, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite'

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          marginTop: 5
        }}
      >
        {process.env.REACT_APP_DEFAULT_EMAIL}
        <Stack spacing={2}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            size="small"
            onChange={e => setEmail(e.target.value)}
            value={email}
            type='text'
            placeholder='Email'
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            size="small"
            onChange={e => setPassword(e.target.value)}
            value={password}
            // type='password'
            placeholder='Password'
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => store.login(email, password)}
          >Login</Button>
          <Button
            variant="contained"
            onClick={() => store.registration(email, password)}
          >Registration</Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default observer(LoginForm);
