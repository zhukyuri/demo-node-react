import React, { useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from './index';
import { localStorageTokenName } from './configs/appConfigs';
import { observer } from 'mobx-react-lite'
import { Button } from '@mui/material';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

function App() {
  const { store } = useContext(Context)
  // @ts-ignore
  const [users, setUsers] = useState<IUser>([])
  const { isAuth, isLoading, user } = store;
  const header = isAuth ? `User is authorization ${user.email}` : 'Authorize, please'

  useEffect(() => {
    if (localStorage.getItem(localStorageTokenName)) store.setAuth(true)
    else store.setAuth(false)
  })

  if (!isAuth) return <LoginForm />

  if (isLoading) return <div>Loading ...</div>

  async function getUsers() {
    try {
      const res = await UserService.getUsers();
      // @ts-ignore
      setUsers(res.data)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <h1>{header}</h1>
      <Button
        variant="contained"
        onClick={() => store.logout()}
      >Log Out</Button>
      <Button
        variant="contained"
        onClick={getUsers}
      >Get Users</Button>

    </div>
  );
}

export default observer(App);
