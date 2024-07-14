import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import { Results } from '../Results/Results';
import { Episode, FetchEpisodes } from '../../services/DataFetch';
import { Button } from '../../utils/ui/Button/Button';
import { Spinner } from '../Spinner/Spinner';

export const SearchComponent: React.FC = () => {
  const [searchItem, setSearchItem] = useState<string>(localStorage.getItem('searchItem') || '');
  const [results, setResults] = useState<Episode[]>(
    JSON.parse(localStorage.getItem('results') || '[]'),
  );
  const [allResults, setAllResults] = useState<Episode[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(
    Number(localStorage.getItem('pageNumber')) || 1,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [pageSize] = useState<number>(7);
  const [totalPages, setTotalPages] = useState<number>(
    Number(localStorage.getItem('totalPages')) || 0,
  );

  const fetchEpisodes = new FetchEpisodes();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchItem) {
      searchHandler(searchItem, pageNumber, false);
    } else {
      loadAllEpisodes();
    }
  }, []);

  useEffect(() => {
    if (error) {
      throw new Error(error.message);
    }
  }, [error]);

  const loadAllEpisodes = (): void => {
    setLoading(true);
    fetchEpisodes
      .getEpisodes('', 1, pageSize)
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

  const searchHandler = (
    searchItem: string,
    pageNumber: number,
    saveToLocalStorage = true,
  ): void => {
    const trimmedSearchItem = searchItem.trim();
    if (saveToLocalStorage && trimmedSearchItem !== '') {
      localStorage.setItem('searchItem', trimmedSearchItem);
    } else if (saveToLocalStorage) {
      localStorage.removeItem('searchItem');
    }

    setLoading(true);
    fetchEpisodes
      .getEpisodes(trimmedSearchItem, pageNumber, pageSize)
      .then((response) => {
        setSearchResults(response.episodes);
        setSearchItem(trimmedSearchItem);
        setPageNumber(pageNumber);
        setTotalPages(response.page.totalPages);
        setLoading(false);
        localStorage.setItem('pageNumber', pageNumber.toString());
        localStorage.setItem('totalPages', response.page.totalPages.toString());
      })
      .catch((error) => {
        setError(error);
        console.error(error);
        setLoading(false);
      });
  };

  const handleSearchChange = (searchItem: string): void => {
    setSearchItem(searchItem);
    if (searchItem.trim() === '') {
      setSearchResults(allResults);
    } else {
      fetchEpisodes
        .searchEpisodes(searchItem.trim())
        .then((results) => {
          setSearchResults(results);
        })
        .catch((error) => {
          setError(error);
          console.error(error);
        });
    }
  };

  const triggerErrorHandler = () => {
    setError(new Error('Test error'));
  };

  const handlePageChange = (newPageNumber: number) => {
    searchHandler(searchItem, newPageNumber);
  };

  const handleEpisodeClick = (id: string) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div>
      <aside>
        <div className="upper-section">
          <SearchBar
            searchItem={searchItem}
            error={error}
            setError={setError}
            onSearch={searchHandler}
            onSearchChange={handleSearchChange}
          />
          <Button onClick={triggerErrorHandler}>Trigger Error</Button>
        </div>
        <div className="lower-section">
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
    </div>
  );
};
