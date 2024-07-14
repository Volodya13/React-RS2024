import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchComponent } from './components/SearchComponent/SearchComponent';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div id="app">
          <Routes>
            <Route path="/" element={<SearchComponent />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
