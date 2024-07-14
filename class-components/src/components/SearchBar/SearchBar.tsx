import React, { ChangeEvent } from 'react';
import './SearchBar.css';
import { Input } from '../../utils/ui/Input/Input';
import { Button } from '../../utils/ui/Button/Button';

interface SearchBarProps {
  searchItem: string;
  error: Error | null;
  setError: (error: Error | null) => void;
  onSearch: (searchItem: string) => void;
  onSearchChange: (searchItem: string) => void;
}

interface SearchBarProps {
  searchItem: string;
  error: Error | null;
  setError: (error: Error | null) => void;
  onSearch: (searchItem: string) => void;
  onSearchChange: (searchItem: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchItem,
  error,
  setError,
  onSearch,
  onSearchChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value;
    onSearchChange(searchItem);
  };

  const handleSearch = () => {
    const trimmedSearchItem = searchItem.trim();
    const regex = /^[a-zA-Z\d]+$/;
    if (!regex.test(trimmedSearchItem)) {
      setError(new Error('Please use only Latin letters.'));
    } else {
      setError(null);
      onSearch(trimmedSearchItem);
    }
  };

  return (
    <div className="search-bar__container">
      <h1>Space - final frontier!</h1>
      <Input value={searchItem} onChange={handleChange} />
      <Button className="search-bar__search-button" onClick={handleSearch}>
        Search
      </Button>
      {error && <div className="error">Error: {error.message}</div>}
    </div>
  );
};
