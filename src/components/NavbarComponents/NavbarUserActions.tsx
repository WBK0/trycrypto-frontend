import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import handleLogout from '../../services/handleLogout';

const NavbarUserActions = () => {

  const { isLoggedIn, setLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  return(
    <div className={`${styles.rightSide} collapse navbar-collapse`} id="navbarNavDropdown">
      {isLoggedIn 
      ? <button aria-current="page" className={styles.logoutButton} onClick={() => handleLogout(navigate, setLoggedIn)}>
          <i className={`bi bi-box-arrow-right ${styles.logoutLink}`}></i>
        </button>
      : <Link aria-current="page" className={styles.loginLink} to="/login">
          <button className={styles.loginButton}>Login</button>
        </Link>
      }
     
      
    </div>
  )
}

export default NavbarUserActions;