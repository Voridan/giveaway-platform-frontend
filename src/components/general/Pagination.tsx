import { FC } from 'react';
import { usePagination } from '../../hooks/usePagination';
import { Box, Button, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface PaginationProps {
  totalPages: number;
  page: number;
  slotSize: number;
  isLoading: boolean;
  changePage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalPages,
  page,
  changePage,
  slotSize,
  isLoading,
}) => {
  const pagesArr = usePagination(totalPages, page, slotSize);

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      alignSelf={'center'}
      columnGap={2}
      marginTop={4}
      marginBottom={4}
      style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
    >
      <Button
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <ArrowBackIos sx={{ marginLeft: 1 }} />
      </Button>

      {pagesArr.map((p) => (
        <Box
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s ease 0s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          height={'2rem'}
          width={'2rem'}
          onClick={() => changePage(p)}
          key={p}
          borderRadius={'50%'}
          border={page === p ? '1px solid #1976d2' : '1px solid transparent'}
        >
          <Typography variant='h6'>{p}</Typography>
        </Box>
      ))}
      <Button
        disabled={page === totalPages}
        onClick={() => changePage(page + 1)}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <ArrowForwardIos sx={{ marginRight: 1 }} />
      </Button>
    </Box>
  );
};

export default Pagination;
