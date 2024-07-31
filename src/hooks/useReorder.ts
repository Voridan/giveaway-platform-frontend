import { useCallback } from 'react';

const useReorder = <T>(key: keyof T) => {
  const reorderFn = useCallback(
    (items: T[], keyValue: T[keyof T]): T[] => {
      const searchItemIdx = items.findIndex((item) => item[key] === keyValue);
      if (searchItemIdx === -1) {
        return items;
      }
      if (searchItemIdx === 0) return [...items];

      return [
        items[searchItemIdx],
        ...items.slice(0, searchItemIdx),
        ...items.slice(searchItemIdx + 1, -1),
      ];
    },
    [key]
  );

  return reorderFn;
};

export default useReorder;
