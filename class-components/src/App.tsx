import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchComponent } from './components/SearchComponent/SearchComponent';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import { NotFound } from './components/NotFound/NotFound.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<SearchComponent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
