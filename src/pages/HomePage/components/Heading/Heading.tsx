import { Link } from "react-router-dom";
import { Header, RegisterButton, RiskHeader, SubHeader, Wrapper } from "./heading.styles";
import { Col } from "../../../../shared/col";
import photo from './photo.png';
import { useContext } from "react";
import AuthContext from "../../../../contexts/AuthContext";

const Heading = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return(
    <Wrapper>
      <Col xs={50}>
        <Header>Buy, sell and trade.</Header>
        <SubHeader>Explore crypto world</SubHeader>
        <RiskHeader>without risk!</RiskHeader>
        <Link to={isLoggedIn ? '/markets' : '/signup'}>
          <RegisterButton>Trade now</RegisterButton>
        </Link>
      </Col>
      <Col xs={50}>
        <img src={photo} width='100%'></img>
      </Col>
    </Wrapper>
  )
}

export default Heading;