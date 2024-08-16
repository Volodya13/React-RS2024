import styles from './App.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header.tsx';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
