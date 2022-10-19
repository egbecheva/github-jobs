import React, { FC } from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationRoundedProps {
  count:any,
  size:any,
  page:number,
  variant:any,
  shape:any,
  onChange:any
}

const PaginationRounded: FC<PaginationRoundedProps> = (props):JSX.Element => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={props.count}
        size={props.size}
        page={props.page}
        variant={props.variant}
        shape={props.shape}
        onChange={props.onChange}
        />
    </Stack>
  );
}
export default  PaginationRounded