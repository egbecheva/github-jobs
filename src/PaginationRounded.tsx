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

const PaginationRounded: FC<PaginationRoundedProps> = ({count, size, page, variant, shape, onChange}):JSX.Element => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        size={size}
        page={page}
        variant={variant}
        shape={shape}
        onChange={onChange}
        />
    </Stack>
  );
}
export default  PaginationRounded