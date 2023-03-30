import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const NavbarUserActions = () => {
  return(
    <div className={`${styles.rightSide} collapse navbar-collapse`} id="navbarNavDropdown">
      <Link aria-current="page" className={styles.loginLink} to="/login">
        <button className={styles.loginButton}>Zaloguj się</button>
      </Link>
      {/* <i className="bi bi-person"></i> */}
    </div>
  )
}

export default NavbarUserActions;