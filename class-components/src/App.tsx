import { Component, ReactNode } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Results } from './components/Results/Results';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Episode, FetchEpisodes} from './services/DataFetch';
import { Button } from './utils/ui/Button/Button';

interface AppState {
  searchItem: string;
  results: Episode[];
  error: Error | null;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

class App extends Component<object, AppState> {
  state: AppState = {
    searchItem: localStorage.getItem('searchItem') || '',
    results: [],
    error: null,
    pageNumber: 1,
    pageSize: 7,
    totalPages: 0,
  };

  fetchEpisodes = new FetchEpisodes();

  componentDidMount() {
    this.searchHandler(this.state.searchItem, this.state.pageNumber);
  }

  setSearchResults = (results: Episode[], totalPages: number): void => {
    this.setState({ results, totalPages });
  };

  setError = (error: Error | null): void => {
    if (this.state.error) {
      this.setState({ error });
    }
  };

  searchHandler = (searchItem: string, pageNumber: number): void => {
    const trimmedSearchItem = searchItem.trim();
    if (trimmedSearchItem !== '') {
      localStorage.setItem('searchItem', trimmedSearchItem);
    } else {
      localStorage.removeItem('searchItem');
    }

    this.fetchEpisodes.getEpisodes(trimmedSearchItem, pageNumber, this.state.pageSize)
      .then(response => {
        this.setSearchResults(response.episodes, response.page.totalPages);
        this.setError(null);
      })
      .catch(error => {
        this.setError(error);
        console.error(error);
      });

    this.setState({ searchItem, pageNumber });
  };

  triggerError = () => {
    this.setState({ error: new Error("Test error") });
    throw new Error("Test error");
  };

  handlePageChange = (newPageNumber: number) => {
    this.searchHandler(this.state.searchItem, newPageNumber);
  };

  render(): ReactNode {
    const { searchItem, results, error, pageNumber, totalPages } = this.state;

    return (
      <div id="app">
        <ErrorBoundary>
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
            <Results episodes={results} pageNumber={pageNumber} totalPages={totalPages} onPageChange={this.handlePageChange} />
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
