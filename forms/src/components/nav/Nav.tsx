import styles from './Nav.module.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className={styles.Nav}>
      <ul className={styles.List}>
        <li>
          <Link className={styles.Link} to={'/uncontrolled'}>
            Uncontrolled
          </Link>
        </li>
        <li>
          <Link className={styles.Link} to={'/controlled'}>
            Controlled
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
