import styles from './App.module.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className={styles.App}>
      <Outlet />
    </div>
  );
}

export default App;
