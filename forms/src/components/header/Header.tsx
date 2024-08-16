import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';

const navs = [
  { to: '/uncontrolled', text: 'Uncontrolled' },
  { to: '/controlled', text: 'Controlled' },
];

function Header() {
  return (
    <header className={styles.header}>
      <Link to={'/'} className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </Link>
      <nav className={styles.Nav}>
        <ul className={styles.List}>
          {navs.map((nav) => (
            <li key={nav.to}>
              <Link className={styles.Link} to={nav.to}>
                {nav.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
