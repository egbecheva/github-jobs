import React, { FC } from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationRoundedProps {
  count: number;
  size: 'small' | 'medium' | 'large' | undefined;
  page: number;
  variant: 'text' | 'outlined' | undefined;
  shape: 'circular' | 'rounded' | undefined;
  onChange: (_: any, p: number) => void;
}

const PaginationRounded: FC<PaginationRoundedProps> = ({
  count,
  size,
  page,
  variant,
  shape,
  onChange,
}): JSX.Element => {
  return (
    <Stack style={{ marginTop: '10px' }} spacing={2}>
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
};
export default PaginationRounded;
