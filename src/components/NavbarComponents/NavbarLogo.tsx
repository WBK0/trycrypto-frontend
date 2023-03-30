import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const NavbarLogo = () => {
  return(
    <Link to="/" className="navbar-brand">
      <img src={logo} width="200" height="40"></img>
    </Link>
  )
}

export default NavbarLogo;