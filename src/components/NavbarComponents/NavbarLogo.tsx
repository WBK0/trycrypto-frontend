import logo from '../../assets/logo.png';
import { Logo, LogoLink } from './styles/navbarLogo.style';

// NavbarLogo component - renders the navbar logo
const NavbarLogo = () => {
  return(
    <LogoLink to="/">
      <Logo src={logo} alt='logo'/>
    </LogoLink>
  )
}

export default NavbarLogo;