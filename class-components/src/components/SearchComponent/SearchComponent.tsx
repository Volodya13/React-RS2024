import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Results from '../Results/Results';
import styles from './SearchComponent.module.css';
import { SearchBar } from '../SearchBar/SearchBar.tsx';

const SearchComponent: FC = () => {
  return (
    <>
      <div className={styles['search-component']}>
        <SearchBar
          searchItem={''}
          error={null}
          setError={() => {
            throw new Error('Function not implemented.');
          }}
          onSearch={() => {
            throw new Error('Function not implemented.');
          }}
        />
        <Results />
      </div>
      <div className={styles['details-section']}>
        <Outlet />
      </div>
    </>
  );
};

export default SearchComponent;
