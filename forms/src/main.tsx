import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/app/App.tsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
);
