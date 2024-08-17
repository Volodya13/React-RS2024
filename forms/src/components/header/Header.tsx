import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';

const nav = [
  { to: '/uncontrolled', text: 'Uncontrolled' },
  { to: '/controlled', text: 'Controlled' },
];

function Header() {
  return (
    <header className={styles.header}>
      <Link to={'/'} className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {nav.map(({ to, text }) => (
            <li key={to}>
              <Link className={styles.link} to={to}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
