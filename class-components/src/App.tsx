import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchComponent } from './components/SearchComponent/SearchComponent';
import DetailComponent from './components/Detail/Detail';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div id="app">
        <Routes>
          <Route path="/" element={<SearchComponent />} />
          <Route path="/detail/:uid" element={<DetailComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
