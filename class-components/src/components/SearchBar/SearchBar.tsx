import { FC, ChangeEvent, useState, useEffect } from 'react';
import styles from './SearchBar.module.css';
import { Input } from '../../utils/ui/Input/Input';
import { Button } from '../../utils/ui/Button/Button';
import { ISearchBarProps } from '../../interfaces/ISearchBarProps';
import { useLazySearchEpisodesQuery } from '../../services/episodesApi';

export const SearchBar: FC<ISearchBarProps> = ({ searchItem, error, setError, onSearch }) => {
  const [searchText, setSearchText] = useState(searchItem || '');
  const [trigger, { data, error: searchError }] = useLazySearchEpisodesQuery();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    trigger({ title: searchText });
  };

  useEffect(() => {
    if (searchError) {
      setError(searchError as Error);
    }
  }, [searchError, setError]);

  useEffect(() => {
    if (data) {
      onSearch(data.episodes);
    }
  }, [data, onSearch]);

  return (
    <div className={styles['search-bar']}>
      <h1>Space - final frontier!</h1>
      <Input value={searchText} onChange={handleChange} />
      <Button className={styles['search-button']} onClick={handleSearch}>
        Search
      </Button>
      {error && <div className={styles['error']}>Error: {error.message}</div>}
    </div>
  );
};
