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
  const { isLoading, authStatus, user, checkAuth, removeUser, registration, logout, login, setAuthStatus } = store;

  useEffect(() => {
    if (LocalToken.read()) {
      checkAuth()
    }
  }, [])

  if (isLoading) return <div>Loading ...</div>

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
      {(authStatus === AuthStatus.Authorized) && <MenuAppBar
        removeUser={removeUser}
        logout={logout}
        user={user}
      />}
      {(authStatus === AuthStatus.LoginForm) && <LoginFormFormik
        setAuthStatus={setAuthStatus}
        login={login}
      />}
      {(authStatus === AuthStatus.RegistrationForm) && <RegistrationFormFormik
        registration={registration}
        setAuthStatus={setAuthStatus}
      />}
      {(authStatus === AuthStatus.Authorized) && <RootPage
        getUsersAll={getUsersAll}
        users={users}
      />}
    </Container>
  );
}

export default observer(App);
