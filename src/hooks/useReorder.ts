import { useCallback } from 'react';

const useReorder = <T>(key: keyof T) => {
  const reorderFn = useCallback(
    (items: T[], keyValue: T[keyof T]): T[] => {
      const searchItemIdx = items.findIndex((item) => item[key] === keyValue);
      if (searchItemIdx === -1) {
        return items;
      }

      // const toReorder = [...items];
      // const firstItem = toReorder[0];
      // toReorder[0] = toReorder[searchItemIdx];
      // toReorder[searchItemIdx] = firstItem;

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
