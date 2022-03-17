import React, { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { observer } from 'mobx-react-lite'
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import { Container } from '@mui/material';
import LocalToken from './services/LocalToken';
import LoginFormFormik from './components/LoginFormFormik';
import MenuAppBar from './components/MenuAppBar';
import RootPage from './components/RootPage';
import { AuthStatus } from './store/Store';
import RegistrationFormFormik from './components/RegistrationFormFormik';

function App() {
  const { store } = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (LocalToken.read()) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) return <div>Loading ...</div>

  const getUsersAll = async (): Promise<void> => {
    try {
      const res = await UserService.getUsers();
      setUsers(res.data)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container maxWidth="xl">
      {(store.authStatus === AuthStatus.Authorized) && <MenuAppBar />}
      {(store.authStatus === AuthStatus.LoginForm) && <LoginFormFormik />}
      {(store.authStatus === AuthStatus.RegistrationForm) && <RegistrationFormFormik />}
      {(store.authStatus === AuthStatus.Authorized) && <RootPage getUsersAll={getUsersAll}
        user={store.user}
        users={users}
        authStatus={store.authStatus}
      />}
    </Container>
  );
}

export default observer(App);
