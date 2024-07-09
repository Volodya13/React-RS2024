import { Component, ReactNode } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Results } from './components/Results/Results';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Episode, FetchEpisodes } from './services/DataFetch';
import { Button } from './utils/ui/Button/Button';
import { Spinner } from './components/Spinner/Spinner';

interface AppState {
  searchItem: string;
  results: Episode[];
  allResults: Episode[];
  error: Error | null;
  pageNumber: number;
  loading: boolean;
  pageSize: number;
  totalPages: number;
  triggerError: boolean;
}

class App extends Component<object, AppState> {
  state: AppState = {
    searchItem: localStorage.getItem('searchItem') || '',
    results: JSON.parse(localStorage.getItem('results') || '[]'),
    allResults: [],
    loading: false,
    error: null,
    pageNumber: Number(localStorage.getItem('pageNumber')) || 1,
    pageSize: 7,
    totalPages: Number(localStorage.getItem('totalPages')) || 0,
    triggerError: false,
  };

  fetchEpisodes = new FetchEpisodes();

  componentDidMount() {
    if (this.state.searchItem) {
      this.searchHandler(this.state.searchItem, this.state.pageNumber, false);
    } else {
      this.loadAllEpisodes();
    }
  }

  componentDidUpdate(_prevProps: AppState, prevState: AppState) {
    if (this.state.error && !prevState.error) {
      throw new Error(this.state.error.message);
    }
  }

  loadAllEpisodes = (): void => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.fetchEpisodes
        .getEpisodes('', 1, this.state.pageSize)
        .then((response) => {
          this.setState({
            allResults: response.episodes,
            results: response.episodes,
            totalPages: response.page.totalPages,
            loading: false,
          });
        })
        .catch((error) => {
          this.setError(error);
          console.error(error);
          this.setState({ loading: false });
        });
    }, 400);
  };

  setSearchResults = (results: Episode[]): void => {
    this.setState({ results, error: null });
    localStorage.setItem('results', JSON.stringify(results));
  };

  setError = (error: Error | null): void => {
    this.setState({ error });
  };

  searchHandler = (searchItem: string, pageNumber: number, saveToLocalStorage = true): void => {
    const trimmedSearchItem = searchItem.trim();
    if (saveToLocalStorage && trimmedSearchItem !== '') {
      localStorage.setItem('searchItem', trimmedSearchItem);
    } else if (saveToLocalStorage) {
      localStorage.removeItem('searchItem');
    }

    this.setState({ loading: true });
    setTimeout(() => {
      this.fetchEpisodes
        .getEpisodes(trimmedSearchItem, pageNumber, this.state.pageSize)
        .then((response) => {
          this.setSearchResults(response.episodes);
          this.setState({
            searchItem: trimmedSearchItem,
            pageNumber,
            totalPages: response.page.totalPages,
            loading: false,
          });
          localStorage.setItem('pageNumber', pageNumber.toString());
          localStorage.setItem('totalPages', response.page.totalPages.toString());
        })
        .catch((error) => {
          this.setError(error);
          console.error(error);
          this.setState({ loading: false });
        });
    }, 400);
  };

  handleSearchChange = (searchItem: string): void => {
    this.setState({ searchItem }, () => {
      if (searchItem.trim() === '') {
        this.setSearchResults(this.state.allResults);
      } else {
        this.fetchEpisodes
          .searchEpisodes(searchItem.trim())
          .then((results) => {
            this.setSearchResults(results);
          })
          .catch((error) => {
            this.setError(error);
            console.error(error);
          });
      }
    });
  };

  triggerError = () => {
    this.setState({ triggerError: true, error: new Error('Test error') });
  };

  handlePageChange = (newPageNumber: number) => {
    this.searchHandler(this.state.searchItem, newPageNumber);
  };

  handleReload = () => {
    window.location.reload();
  };

  render(): ReactNode {
    const { searchItem, results, loading, pageNumber, totalPages } = this.state;

    return (
      <ErrorBoundary>
        <div id="app">
          <div className="upper-section">
            <SearchBar
              searchItem={searchItem}
              error={this.state.error}
              setError={this.setError}
              onSearch={this.searchHandler}
              onSearchChange={this.handleSearchChange}
            />
            <Button onClick={this.triggerError}>Trigger Error</Button>
          </div>
          <div className="lower-section">
            {loading ? (
              <Spinner />
            ) : (
              <Results
                episodes={results}
                pageNumber={pageNumber}
                totalPages={totalPages}
                onPageChange={this.handlePageChange}
              />
            )}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
