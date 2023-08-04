import { Col } from "../../shared/col";
import { Container } from "../../shared/container";
import { Row } from "../../shared/row";
import { Copyright, Icon, IconsWrapper, Logo, LogoWrapper, Wrapper } from "./footer.styles";
import logo from '../../assets/logo.png';

const Footer = () => {
  return(
    <Wrapper>
      <Container>
        <Row alignItems="center" height="200px">
          <Col xs={100} md={33.33} pb="0px">
            <LogoWrapper>
              <Logo src={logo}/>
            </LogoWrapper>
          </Col>
          <Col xs={100} md={33.33} pb="0px">
            <Copyright>Trycrypto.pl 0.1-alpha</Copyright>
          </Col>
          <Col xs={100} md={33.33} pb="0px">
            <IconsWrapper>
              <Icon className="bi bi-facebook"></Icon>
              <Icon className="bi bi-instagram"></Icon>
              <Icon className="bi bi-twitter"></Icon>
            </IconsWrapper>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default Footer;