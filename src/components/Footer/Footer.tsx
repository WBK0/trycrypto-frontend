import { Col } from "../../shared/col";
import { Container } from "../../shared/container";
import { Row } from "../../shared/row";
import { Copyright, Icon, IconsWrapper, Logo, LogoWrapper, Wrapper } from "./footer.styles";
import logo from '../../assets/logo.png';

// Footer component - renders the footer
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
              <a 
                href="https://github.com/WBK0" 
                target="_blank"
              >
                <Icon className="bi bi-github"></Icon>
              </a>
              <a 
                href="https://www.linkedin.com/in/bart%C5%82omiej-ostojski-625b83246/" 
                target="_blank"
              >
                <Icon className="bi bi-linkedin"></Icon>
              </a>
            </IconsWrapper>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default Footer;