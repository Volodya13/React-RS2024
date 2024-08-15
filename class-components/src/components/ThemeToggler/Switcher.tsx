import { FC } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Switcher.module.css';

const Switcher: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles['switcher']}>
      <input
        type="checkbox"
        id="theme-switch"
        className={styles['switch']}
        onChange={toggleTheme}
        checked={theme === 'dark'}
      />
      <label htmlFor="theme-switch" className={styles['label']}>
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </label>
    </div>
  );
};

export default Switcher;
