import styles from './LoginPage.module.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return(
    <div className={styles.loginLayout}>
      <div className='container'>
        <div className='row d-flex justify-content-center align-items-center vh-100'>
          <div className='col-4'>
            <div className={styles.loginContainer}>
              <div className='d-flex justify-content-center'>
                <img src={logo} width="85%"/>
              </div>
              <div className='mt-4'>
                <label htmlFor="email" className={`form-label ${styles.loginLabel}`}>Email address</label>
                <input className={`form-control form-control-lg mx-auto ${styles.loginInput}`} id="email" type="email"/>
                <label htmlFor="email" className={`form-label mt-3 ${styles.loginLabel}`}>Password</label>
                <input className={`form-control form-control-lg mx-auto ${styles.loginInput}`} type="password" />
                <button type="button" className={`btn btn-lg ${styles.loginButton}`}>LOGIN</button>
              </div>
              <div className='mt-3 d-flex justify-content-center'>
                <Link to="/reset-password" className={styles.resetPassword}>Forgot your password?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;