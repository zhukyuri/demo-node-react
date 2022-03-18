import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import TableUsers from './TableUsers';
import { IUser } from '../models/IUser';

interface Props {
  getUsersAll: () => Promise<void>;
  users: IUser[];
}

function RootPage({ getUsersAll, users }: Props) {

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        marginTop: 5
      }}
    >
      <Stack spacing={2}>
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
