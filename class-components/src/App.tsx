import { Component, ReactNode } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Results } from './components/Results/Results';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Episode, FetchEpisodes } from './services/DataFetch';
import { Button } from './utils/ui/Button/Button';

interface AppState {
  searchItem: string;
  results: Episode[];
  error: Error | null;
}

class App extends Component<object, AppState> {
  state: AppState = {
    searchItem: localStorage.getItem('searchItem') || '',
    results: [],
    error: null,
  };

  fetchEpisodes = new FetchEpisodes();

  componentDidMount() {
    this.searchHandler(this.state.searchItem);
  }

  setSearchResults = (results: Episode[]): void => {
    this.setState({ results });
  };

  setError = (error: Error | null): void => {
    this.setState({ error });
  };

  searchHandler = (searchItem: string): void => {
    const trimmedSearchItem = searchItem.trim();
    if (trimmedSearchItem !== '') {
      localStorage.setItem('searchItem', trimmedSearchItem);
    } else {
      localStorage.removeItem('searchItem');
    }

    const url = `https://stapi.co/api/v1/rest/episode/search?pageSize=20&title=${encodeURIComponent(trimmedSearchItem)}`;
    this.fetchEpisodes
      .getEpisodes(url)
      .then((response) => {
        this.setSearchResults(response.episodes);
        this.setError(null);
      })
      .catch((error) => {
        this.setError(error);
        console.error(error);
      });

    this.setState({ searchItem });
  };

  triggerError = () => {
    throw new Error('Test error');
  };

  render(): ReactNode {
    const { searchItem, results, error } = this.state;
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
            <Button className="search-bar__error-button" onClick={this.triggerError}>
              Trigger Error
            </Button>
          </div>
          <div className="lower-section">
            <Results episodes={results} />
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
