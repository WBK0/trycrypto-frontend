import { useState } from 'react';
import NavbarUserActions from './NavbarUserActions';
import { LinksContainer, NavbarExtendedContainer, NavbarLink, NavbarLinkExtended, ResponsiveButton, ResponsiveContainer } from './styles/navbarContent.style';

const NavbarContent = () => {
  const [extendNavbar, setExtendedNavbar] = useState(false)
  return(
    <>
      <LinksContainer>
        <NavbarLink to="/markets">Markets</NavbarLink>           
        <NavbarLink to="/wallet">Wallet</NavbarLink>
        <NavbarLink to="/history/trades">Historical trades</NavbarLink>
        <NavbarLink to="/history/orders">Historical orders</NavbarLink>
      </LinksContainer>    
      <NavbarUserActions extended={false}/>
      <ResponsiveContainer>
        <ResponsiveButton onClick={() => setExtendedNavbar(!extendNavbar)}>
          <i className="bi bi-list"></i>
        </ResponsiveButton>
        {extendNavbar ?
          <NavbarExtendedContainer>
            <NavbarLinkExtended to="/markets">Markets</NavbarLinkExtended>  
            <NavbarLinkExtended to="/wallet">Wallet</NavbarLinkExtended>  
            <NavbarLinkExtended to="/history/trades">Historical trades</NavbarLinkExtended>  
            <NavbarLinkExtended to="/history/orders">Historical orders</NavbarLinkExtended>
            <NavbarUserActions extended={true}/>
          </NavbarExtendedContainer>
        : null
        }
        
      </ResponsiveContainer>
    </>
  )
}

export default NavbarContent;
