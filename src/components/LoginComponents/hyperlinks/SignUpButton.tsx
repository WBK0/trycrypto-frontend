import {Link} from 'react-router-dom';
import styles from './hyperlinks.module.css';

const SignUpButton = () => {
  return(
    <div className={styles.registerArrow}>
      <Link to="/signup" className={styles.signupLink}>
        <span className={styles.signupText}>Signup</span>
        <i className="bi bi-arrow-right"></i>
      </Link>
    </div>
  )
}

export default SignUpButton;