import { useState } from 'react';

const usePopup = () => {
  const [popupTitle, setPopupTitle] = useState('');
  const [popupContent, setPopupContent] = useState<React.ReactNode>('');
  const [isError, setIsError] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [callback, setCallback] = useState<() => void>();

  const closePopup = () => {
    callback && callback();
    setOpenPopup(false);
  };

  const popupFields = {
    popupTitle,
    popupContent,
    isError,
    openPopup,
  };

  const popupHandlers = {
    setPopupTitle,
    setPopupContent,
    setIsError,
    setOpenPopup,
    closePopup,
    setCallback,
  };

  return {
    popupFields,
    popupHandlers,
  };
};

export default usePopup;
