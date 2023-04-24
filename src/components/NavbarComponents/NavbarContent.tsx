import { useState } from 'react';
import NavbarUserActions from './NavbarUserActions';
import { LinksContainer, NavbarExtendedContainer, NavbarLink, NavbarLinkExtended, ResponsiveButton, ResponsiveContainer } from './styles/navbarContent.style';

const NavbarContent = () => {
  const [extendNavbar, setExtendedNavbar] = useState(false)
  console.log(extendNavbar)
  return(
    <>
      <LinksContainer>
        <NavbarLink to="/markets">Markets</NavbarLink>           
        <NavbarLink to="/das">Portfel</NavbarLink>
      </LinksContainer>    
      <NavbarUserActions extended={false}/>
      <ResponsiveContainer>
        <ResponsiveButton onClick={() => setExtendedNavbar(!extendNavbar)}>
          <i className="bi bi-list"></i>
        </ResponsiveButton>
        {extendNavbar ?
          <NavbarExtendedContainer>
            <NavbarLinkExtended to="/markets">Markets</NavbarLinkExtended>  
            <NavbarLinkExtended to="/markets">Markets</NavbarLinkExtended>  
            <NavbarUserActions extended={true}/>
          </NavbarExtendedContainer>
        : null
        }
        
      </ResponsiveContainer>
    </>
  )
}

export default NavbarContent;
