import { ChangeEvent, useState } from 'react';
import './SearchBar.css';
import { Input } from '../../utils/ui/Input/Input';
import { Button } from '../../utils/ui/Button/Button';

interface SearchBarProps {
  searchItem: string;
  error: Error | null;
  setError: (error: Error | null) => void;
  onSearch: (searchItem: string, pageNumber: number) => void;
  onSearchChange: (searchItem: string) => void;
}

export function SearchBar(props: SearchBarProps) {
  const [searchItem, setSearchItem] = useState(props.searchItem);
  const [warning, setWarning] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value;
    setSearchItem(searchItem);
    setWarning('');
    props.onSearchChange(searchItem);
  };

  const handleSearch = () => {
    const trimmedSearchItem = searchItem.trim();
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(trimmedSearchItem)) {
      setWarning('Please use only Latin letters.');
    } else {
      props.onSearch(trimmedSearchItem, 1);
    }
  };

  return (
    <div className="search-bar__container">
      <h1>Space - final frontier!</h1>
      <Input value={searchItem} onChange={handleChange} />
      <Button className="search-bar__search-button" onClick={handleSearch}>
        Search
      </Button>
      {warning && <div className="warning">{warning}</div>}
      {props.error && <div className="error">Error: {props.error.message}</div>}
    </div>
  );
}
