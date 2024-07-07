import { Component } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Results } from './components/Results/Results';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  render() {
    return <div id='app'>
      <ErrorBoundary>
        <SearchBar />
        <Results />
      </ErrorBoundary>
    </div>;
  }
}

export default App;
