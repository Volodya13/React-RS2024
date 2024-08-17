import styles from './Footer.module.css';
import RSLogo from '../../assets/icons/rs-logo.svg';
import GitHubLogo from '../../assets/icons/github.svg';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className={styles.Footer}>
      <Link to={'https://github.com/Volodya13'} target={'_blank'}>
        <GitHubLogo />
      </Link>
      <p>&copy; 2024</p>
      <Link to={'https://rs.school/courses'} target={'_blank'}>
        <RSLogo />
      </Link>
    </footer>
  );
}

export default Footer;
