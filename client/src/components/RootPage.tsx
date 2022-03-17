import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import TableUsers from './TableUsers';
import { IUser } from '../models/IUser';
import { AuthStatus } from '../store/Store';

interface Props {
  getUsersAll: () => Promise<void>;
  users: IUser[];
  authStatus: AuthStatus
  user: IUser;
}

function RootPage({getUsersAll, users, user, authStatus}:Props) {
  const header = authStatus ? `User is authorized ${user.email}` : 'Authorize, please'

  return (
    <Box
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
            onClick={getUsersAll}
          >Get Users</Button>
        </Stack>

        {TableUsers(users)}

      </Stack>
    </Box>
  )

}

export default RootPage
