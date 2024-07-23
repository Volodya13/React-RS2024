import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import { Results } from '../Results/Results';
import { Episode, FetchEpisodes } from '../../services/DataFetch';
import { Button } from '../../utils/ui/Button/Button';
import { Spinner } from '../Spinner/Spinner';
import styles from './SearchComponent.module.css';
import Detail from '../Detail/Detail.tsx';

export const SearchComponent = () => {
  const [searchItem, setSearchItem] = useState<string>(localStorage.getItem('searchItem') || '');
  const [results, setResults] = useState<Episode[]>([]);
  const [allResults, setAllResults] = useState<Episode[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageSize] = useState<number>(7);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchEpisodes = new FetchEpisodes();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (searchItem) {
      searchHandler(searchItem, pageNumber, false);
    } else {
      loadAllEpisodes(pageNumber);
    }
  }, [pageNumber]);

  useEffect(() => {
    if (error) {
      throw new Error(error.message);
    }
  }, [error]);

  const loadAllEpisodes = (pageNumber: number): void => {
    setLoading(true);
    fetchEpisodes
      .getEpisodes(pageNumber, pageSize)
      .then((response) => {
        setAllResults(response.episodes);
        setResults(response.episodes);
        setTotalPages(response.page.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        console.error(error);
        setLoading(false);
      });
  };

  const setSearchResults = (results: Episode[]): void => {
    setResults(results);
    setError(null);
    localStorage.setItem('results', JSON.stringify(results));
  };

  const searchHandler = (query: string, pageNumber: number, saveToLocalStorage = true): void => {
    const trimmedSearchItem = query.trim();
    setLoading(true);
    fetchEpisodes
      .searchEpisodes(trimmedSearchItem)
      .then((response) => {
        if (response.length === 0) {
          navigate('/404');
        } else {
          setSearchResults(response);
          setSearchItem(trimmedSearchItem);
          setTotalPages(Math.ceil(response.length / pageSize));
          setLoading(false);
          if (saveToLocalStorage && trimmedSearchItem !== '') {
            localStorage.setItem('searchItem', trimmedSearchItem);
            localStorage.setItem('pageNumber', pageNumber.toString());
            localStorage.setItem('totalPages', Math.ceil(response.length / pageSize).toString());
          }
        }
      })
      .catch((error) => {
        setError(error);
        console.error(error);
        setLoading(false);
      });
  };

  const handleSearchChange = (query: string): void => {
    setSearchItem(query);
    if (query.trim() === '') {
      setResults(allResults);
      localStorage.removeItem('searchItem');
      localStorage.removeItem('results');
      localStorage.removeItem('pageNumber');
      localStorage.removeItem('totalPages');
    }
  };

  const handleSearch = (query: string) => {
    searchHandler(query, 1, true);
  };

  const triggerErrorHandler = () => {
    setError(new Error('Test error'));
  };

  const handlePageChange = (newPageNumber: number) => {
    setSearchParams({ page: newPageNumber.toString() });
  };

  const handleEpisodeClick = (id: string) => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.set('details', id);
    navigate({ search: currentParams.toString() });
  };

  return (
    <div className={styles["search-component"]}>
      <aside>
        <div className={styles["upper-section"]}>
          <SearchBar
            searchItem={searchItem}
            error={error}
            setError={setError}
            onSearch={handleSearch}
            onSearchChange={handleSearchChange}
          />
          <Button onClick={triggerErrorHandler}>Trigger Error</Button>
        </div>
        <div className={styles["lower-section"]}>
          {loading ? (
            <Spinner />
          ) : (
            <Results
              episodes={results}
              pageNumber={pageNumber}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onEpisodeClick={handleEpisodeClick}
            />
          )}
        </div>
      </aside>
      <section>
        {searchParams.get('details') && <Detail id={searchParams.get('details')!} />}
      </section>
    </div>
  );
};
