import { TextField } from '@mui/material';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useDebounce from '../../../hooks/useDebounce';

interface InputSearchProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSearchResult: (...args: any[]) => void;
  url: string;
  queryParam: string;
  label: string;
}

const InputOnlySearch: FC<InputSearchProps> = ({
  setSearchResult,
  url,
  queryParam,
  label,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce<string>(query, 1000);

  const onChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setSearchResult(null);
      return;
    }
    const makeRequest = async () => {
      url += `?${queryParam}=` + debouncedQuery;
      const response = await axiosPrivate.get(url);
      setSearchResult(response.data);
    };

    makeRequest();
  }, [debouncedQuery]);

  return (
    <div>
      <TextField
        style={{ width: '100%' }}
        id='outlined-controlled'
        value={query}
        label={label}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value);
        }}
      />
    </div>
  );
};

export default InputOnlySearch;
