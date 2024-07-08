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
}

class App extends Component<object, AppState> {
  state: AppState = {
    searchItem: localStorage.getItem('searchItem') || '',
    results: [],
    allResults: [],
    loading: false,
    error: null,
    pageNumber: 1,
    pageSize: 7,
    totalPages: 0,
  };

  fetchEpisodes = new FetchEpisodes();

  componentDidMount() {
    this.loadAllEpisodes();
    if (this.state.searchItem) {
      this.searchHandler(this.state.searchItem, this.state.pageNumber);
    }
  }

  loadAllEpisodes = (): void => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.fetchEpisodes
        .getEpisodes('', 1, this.state.pageSize)
        .then((response) => {
          this.setState({ allResults: response.episodes, results: response.episodes, totalPages: response.page.totalPages, loading: false });
        })
        .catch((error) => {
          this.setError(error);
          console.error(error);
          this.setState({ loading: false });
        });
    }, 1400);
  };

  setSearchResults = (results: Episode[]): void => {
    this.setState({ results, error: null });
  };

  setError = (error: Error | null): void => {
    this.setState({ error });
  };

  searchHandler = (searchItem: string, pageNumber: number): void => {
    const trimmedSearchItem = searchItem.trim();
    if (trimmedSearchItem !== '') {
      const timestamp = new Date().toISOString();
      localStorage.setItem(`searchItem-${timestamp}`, trimmedSearchItem);
    } else {
      localStorage.removeItem('searchItem');
    }

    this.setState({ loading: true });
    setTimeout(() => {
      const filteredResults = this.state.allResults.filter(episode =>
        episode.title.toLowerCase().includes(trimmedSearchItem.toLowerCase())
      );

      this.setSearchResults(filteredResults);
      this.setState({ searchItem: trimmedSearchItem, pageNumber, loading: false });
    }, 1400);
  };

  triggerError = () => {
    this.setState({ error: new Error('Test error') });
    throw new Error('Test error');
  };

  handlePageChange = (newPageNumber: number) => {
    this.searchHandler(this.state.searchItem, newPageNumber);
  };

  handleReload = () => {
    window.location.reload();
  };

  render(): ReactNode {
    const { searchItem, results, error, loading, pageNumber, totalPages } = this.state;

    if (error) {
      return (
        <div className="error-page">
          <h2>Something went wrong</h2>
          <p>We're sorry, but something went wrong. Please try again later.</p>
          <button onClick={this.handleReload}>Reload</button>
        </div>
      );
    }

    return (
      <ErrorBoundary>
        <div id="app">
          <div className="upper-section">
            <SearchBar
              searchItem={searchItem}
              error={error}
              setError={this.setError}
              onSearch={this.searchHandler}
            />
            <Button onClick={this.triggerError}>Trigger Error</Button>
          </div>
          <div className="lower-section">
            {loading
            ? <Spinner />
            : <Results
                episodes={results}
                pageNumber={pageNumber}
                totalPages={totalPages}
                onPageChange={this.handlePageChange}
            />}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
