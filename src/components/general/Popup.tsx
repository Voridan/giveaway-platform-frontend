import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { createPortal } from 'react-dom';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  isError: boolean;
  title: string;
  content: React.ReactNode;
}

const StyledDialogTitle = styled(DialogTitle)<{ isError: boolean }>(
  ({ theme, isError }) => ({
    backgroundColor: isError
      ? theme.palette.error.main
      : theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: 'center',
    fontSize: '1.5rem',
  })
);

const StyledDialogContent = styled(DialogContent)(() => ({
  textAlign: 'center',
}));

const Popup: React.FC<PopupProps> = ({
  open,
  onClose,
  isError,
  title,
  content,
}) => {
  return createPortal(
    <Dialog maxWidth='md' fullWidth open={open} onClose={onClose}>
      <StyledDialogTitle isError={isError}>{title}</StyledDialogTitle>
      <StyledDialogContent>{content}</StyledDialogContent>
      <DialogActions>
        <Button onClick={onClose} color={isError ? 'error' : 'primary'}>
          Close
        </Button>
      </DialogActions>
    </Dialog>,
    document.getElementById('popup')!
  );
};

export default Popup;
