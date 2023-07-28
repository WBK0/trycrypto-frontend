import logo from '../../assets/logo.png'
import { Container } from '../../shared/container';
import { Wrapper, Image } from './Login.style';
import { Row } from '../../shared/row';
import { Col } from '../../shared/col';

// Defining the interface for the component props
interface Props {
  children: React.ReactNode;
}

const LoginLayout: React.FC<Props> = ({children}) => {
  return(
    <Wrapper>
      <Container>
        <Row justifyContent='center' alignItems='center' height='100vh' >
          <Col xs={100} sm={80} md={60} lg={45} xl={35} pr='0px'>
            <Row justifyContent='center'>
              <Image src={logo}/>
            </Row>
            {/* Displaying child components */}
            {children}
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default LoginLayout;