import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchComponent } from '../SearchComponent/SearchComponent';
import styles from './App.module.css';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { NotFound } from '../NotFound/NotFound';
import { Button } from '../../utils/ui/Button/Button';
import { useTheme } from '../../context/ThemeContext';
import Detail from '../Detail/Detail';

const App: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles[theme.concat('-app')]}>
      <header className={styles['header']}>
        <Button onClick={toggleTheme} className={styles[theme.concat('-button')]}>
          {theme}
        </Button>
      </header>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<SearchComponent />} />
            <Route path="/details/:id" element={<Detail id={''} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </div>
  );
};

export default App;
