import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import handleLogout from '../../services/handleLogout';
import { ActionsContainer, LoginButton, LoginLink, LogoutButton, ProfileButton } from './styles/navbarActions.style';

interface INavbarUserActions{
  extended: boolean
}

const NavbarUserActions: React.FC<INavbarUserActions> = ({ extended }) => {
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

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
          onClick={() => handleLogout({navigate, setLoggedIn})}
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