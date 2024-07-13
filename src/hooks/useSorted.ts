import { useMemo } from 'react';

export const useSorted = <T>(collection: T[], key: keyof T): T[] => {
  const sortedCollection = useMemo(() => {
    if (!collection.length) return [];

    const keyValue = collection[0][key];
    if (new Date(keyValue as string) instanceof Date) {
      return [...collection].sort(
        (a, b) =>
          new Date(
            new Intl.DateTimeFormat('en-US').format(new Date(b[key] as Date))
          ).getTime() -
          new Date(
            new Intl.DateTimeFormat('en-US').format(new Date(a[key] as Date))
          ).getTime()
      );
    } else if (typeof keyValue === 'string') {
      return [...collection].sort((a, b) =>
        (a[key] as string).localeCompare(b[key] as string)
      );
    } else if (typeof keyValue === 'number') {
      return [...collection].sort(
        (a, b) => (b[key] as number) - (a[key] as number)
      );
    }

    return collection;
  }, [key, collection]);

  return sortedCollection;
};
