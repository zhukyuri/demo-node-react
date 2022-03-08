import React, { useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from './index';
import { localStorageTokenName } from './configs/appConfigs';
import { observer } from 'mobx-react-lite'
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import { Box, Button, Container, Stack } from '@mui/material';
import TableUsers from './components/TableUsers';

function App() {
  const { store } = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])
  const { isAuth, isLoading, user } = store;
  const header = isAuth ? `User is authorization ${user.email}` : 'Authorize, please'

  useEffect(() => {
    if (localStorage.getItem(localStorageTokenName)) store.setAuth(true)
    else store.setAuth(false)
  },[])

  if (!isAuth) return <LoginForm />

  if (isLoading) return <div>Loading ...</div>

  async function getUsers() {
    try {
      const res = await UserService.getUsers();
      console.log(res.data)
      setUsers(res.data)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          marginTop: 5
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2}>
          <h1>{header}</h1>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => store.logout()}
            >Log Out</Button>
            <Button
              variant="contained"
              onClick={getUsers}
            >Get Users</Button>
          </Stack>

          {TableUsers(users)}

        </Stack>
      </Box>
    </Container>
  );
}

export default observer(App);
