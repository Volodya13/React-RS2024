import { FC, ChangeEvent, useEffect } from 'react';
import styles from './SearchBar.module.css';
import { Input } from '../../utils/ui/Input/Input';
import { Button } from '../../utils/ui/Button/Button';
import { ISearchBarProps } from '../../interfaces/ISearchBarProps';

export const SearchBar: FC<ISearchBarProps> = ({
  searchItem,
  error,
  setError,
  /*onSearchChange,*/ onSearch,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    return event.target.value;
  };

  const handleSearch = () => {
    onSearch(searchItem);
  };
  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);

  return (
    <div className={styles['search-bar']}>
      <h1>Space - final frontier!</h1>
      <Input value={searchItem || ''} onChange={handleChange} />
      <Button className={styles['search-button']} onClick={handleSearch}>
        Search
      </Button>
      {error && <div className={styles['error']}>Error: {error.message}</div>}
    </div>
  );
};
