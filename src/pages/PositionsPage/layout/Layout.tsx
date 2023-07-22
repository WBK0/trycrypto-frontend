import Navbar from "../../../layout/Navbar/Navbar";
import { Col } from "../../../shared/col";
import { Row } from "../../../shared/row";
import Navigation from "../navigation/Navigation";
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
          
        </Content>
      </ContainerFluid>
    </Wrapper>
  )
}

export default PositionsLayout;