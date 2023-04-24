import logo from '../../assets/logo.png';
import { Logo, LogoLink } from './styles/navbarLogo.style';

const NavbarLogo = () => {
  return(
    <LogoLink to="/">
      <Logo src={logo} alt='logo'/>
    </LogoLink>
  )
}

export default NavbarLogo;