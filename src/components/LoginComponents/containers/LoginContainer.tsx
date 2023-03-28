import styles from './Container.module.css';
import logo from '../../../assets/logo.png'

// Defining the interface for the component props
interface Props {
  children: React.ReactNode;
}

const LoginContainer: React.FC<Props> = ({children}) => {
  return(
    <div className={styles.loginLayout}>
      <div className='container'>
        <div className='row d-flex justify-content-center align-items-center vh-100'>
          <div className='col-xl-4 col-lg-5 col-md-7 col-sm-10 col-11'>
            <div className='d-flex justify-content-center'>
              <img src={logo} width="85%"/>
            </div>
            <div>
              {/* Displaying child components */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginContainer;