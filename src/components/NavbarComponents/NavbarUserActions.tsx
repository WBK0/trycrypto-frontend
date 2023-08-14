import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import handleLogout from '../../services/handleLogout';
import { ActionsContainer, LoginButton, LoginLink, LogoutButton, ProfileButton } from './styles/navbarActions.style';

// INavbarUserActions interface
interface INavbarUserActions{
  extended: boolean
}

// NavbarUserActions component - displays the user actions in the navbar
const NavbarUserActions: React.FC<INavbarUserActions> = ({ extended }) => {
  // Getting the isLoggedIn and setLoggedIn functions from the AuthContext
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext)

  return(
    <ActionsContainer extended={extended}>
      {isLoggedIn 
      ? <>
        <Link to="/profile">
          <ProfileButton>
            <i className="bi bi-person"></i>
          </ProfileButton>
        </Link>
        <LogoutButton 
          onClick={() => handleLogout({setLoggedIn})}
        >
          <i className='bi bi-box-arrow-right'></i>
        </LogoutButton>
        
        </>
      : <LoginLink to="/login">
          <LoginButton>Login</LoginButton>
        </LoginLink>
      }
    </ActionsContainer>
  )
}

export default NavbarUserActions;