import { useState } from "react";
import Navbar from "../../../layout/Navbar/Navbar";
import Navigation from "../Navigation/Navigation";
import { ContainerFluid, Content, NavbarLeft, NavbarSwitch, Wrapper } from "./layout.styles";

interface IPositionsLayout{
  children: React.ReactNode;
}

// Layout component - renders the layout for the positions page
const PositionsLayout: React.FC<IPositionsLayout> = ({ children }) => {
  const [showNavigation, setShowNavigation] = useState(false)

  return(
    <Wrapper>
      <Navbar />
      <ContainerFluid>
        <NavbarSwitch onClick={() => setShowNavigation(!showNavigation)}>
          <i className="bi bi-arrow-right-short"></i>
        </NavbarSwitch>
        <NavbarLeft show={showNavigation} onClick={() => setShowNavigation(!showNavigation)}>
          <Navigation />
        </NavbarLeft>
        <Content>
          {children}
        </Content>
      </ContainerFluid>
    </Wrapper>
  )
}

export default PositionsLayout;