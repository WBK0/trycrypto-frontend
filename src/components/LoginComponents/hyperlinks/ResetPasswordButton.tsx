import {Link} from 'react-router-dom';
import styles from './hyperlinks.module.css';


const ResetPasswordButton = () => {
  return(
    <div className='mt-3 d-flex justify-content-center'>
      <Link to="/reset-password" className={styles.resetPassword}>Forgot your password?</Link>
    </div>
  )
}

export default ResetPasswordButton;