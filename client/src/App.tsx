import React, { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { observer } from 'mobx-react-lite'
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import { Box, Button, Container, Stack } from '@mui/material';
import TableUsers from './components/TableUsers';
import LocalToken from './services/LocalToken';
import LoginFormFormik from './components/LoginFormFormik';
import MenuAppBar from './components/MenuAppBar';

function App() {
  const { store } = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])
  const { isAuth, isLoading, user } = store;
  const header = isAuth ? `User is authorized ${user.email}` : 'Authorize, please'

  useEffect(() => {
    if (LocalToken.read()) {
      store.checkAuth()
    }
  }, [])

  if (isLoading) return <div>Loading ...</div>

  async function getUsers() {
    try {
      const res = await UserService.getUsers();
      setUsers(res.data)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container maxWidth="xl">
      <MenuAppBar />
      {!isAuth && <LoginFormFormik />}
      {isAuth && <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          marginTop: 5
        }}
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
            <Button
              variant="contained"
              onClick={() => store.removeUser()}
            >Delete User</Button>
          </Stack>

          {TableUsers(users)}

        </Stack>
      </Box>
      }
    </Container>
  );
}

export default observer(App);
