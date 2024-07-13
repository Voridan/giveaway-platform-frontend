import { useMemo } from 'react';

export const usePagination = (
  pagesCount: number,
  currentPage: number,
  buttonsNum: number
) => {
  const pagesArray = useMemo(() => {
    const pagesArr = [];
    const threshold = Math.floor(buttonsNum / 2);

    let startPage = currentPage - threshold;
    let endPage = currentPage + threshold;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(buttonsNum, pagesCount);
    } else if (endPage > pagesCount) {
      endPage = pagesCount;
      startPage = Math.max(pagesCount - buttonsNum + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesArr.push(i);
    }

    return pagesArr;
  }, [buttonsNum, currentPage, pagesCount]);

  return pagesArray;
};
