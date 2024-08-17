import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page/MainPage.tsx';
import Uncontrolled from './pages/uncontroled/Uncontrolled.tsx';
import Controlled from './pages/controled/Controlled.tsx';
import { Provider } from 'react-redux';
import { setupStore } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={setupStore}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<MainPage />} />
            <Route path="uncontrolled" element={<Uncontrolled />} />
            <Route path="controlled" element={<Controlled />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
);
