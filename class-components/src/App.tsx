import { Component } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Results } from './components/Results/Results';

class App extends Component {
  render() {
    return <div id='app'>
      <SearchBar />
      <Results />
    </div>;
  }
}

export default App;
