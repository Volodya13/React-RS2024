import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchComponent from '../SearchComponent/SearchComponent';
import styles from './App.module.css';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { NotFound } from '../NotFound/NotFound';
import { useTheme } from '../../context/ThemeContext';
import Detail from '../Detail/Detail';
import Switcher from '../ThemeToggler/Switcher.tsx';

const App: FC = () => {
  const { theme } = useTheme();

  return (
    <div className={styles[theme.concat('-app')]} id={styles['app']}>
      <header className={styles['header']}>
        <Switcher />
      </header>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<SearchComponent />}>
              <Route path="details/:id" element={<Detail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </div>
  );
};

export default App;
