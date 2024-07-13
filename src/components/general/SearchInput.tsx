import { Theme } from '@emotion/react';
import { Autocomplete, SxProps, TextField } from '@mui/material';

interface SearchInputProps<T> {
  options: T[];
  optionLabelKey: keyof T;
  onChange: (selectedTitle: T[keyof T] | string) => void;
  styles: SxProps<Theme>;
}

const SearchInput = <T,>({
  options,
  optionLabelKey,
  onChange,
  styles,
}: SearchInputProps<T>) => {
  return (
    <Autocomplete
      sx={styles}
      onChange={(_, value) => {
        onChange(value);
      }}
      freeSolo
      id='free-solo-2-demo'
      disableClearable
      options={options.map((option) => option[optionLabelKey])}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Search giveaway'
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  );
};

export default SearchInput;
