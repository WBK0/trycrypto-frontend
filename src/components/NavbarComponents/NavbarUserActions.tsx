import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

const NavbarUserActions = () => {

  const { isLoggedIn } = useContext(AuthContext)

  return(
    <div className={`${styles.rightSide} collapse navbar-collapse`} id="navbarNavDropdown">
      {isLoggedIn ? <i className="bi bi-person"></i> 
      :
       <Link aria-current="page" className={styles.loginLink} to="/login">
        <button className={styles.loginButton}>Zaloguj się</button>
        </Link>
      }
     
      
    </div>
  )
}

export default NavbarUserActions;