import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/app/App.tsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.tsx';
import Uncontrolled from './pages/Uncontrolled.tsx';
import Controlled from './pages/Controlled.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MainPage />} />
          <Route path="uncontrolled" element={<Uncontrolled />} />
          <Route path="controlled" element={<Controlled />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
);
