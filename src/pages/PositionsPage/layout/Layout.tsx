import Navbar from "../../../layout/Navbar/Navbar";
import Navigation from "../Navigation/Navigation";
import { ContainerFluid, Content, NavbarLeft, Wrapper } from "./layout.styles";

interface IPositionsLayout{
  children: React.ReactNode;
}

const PositionsLayout: React.FC<IPositionsLayout> = ({ children }) => {
  return(
    <Wrapper>
      <Navbar />
      <ContainerFluid>
        <NavbarLeft>
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