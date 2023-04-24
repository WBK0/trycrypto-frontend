import { Container } from "../../shared/container";
import { Row } from "../../shared/row";
import { Navigation } from "./styles/navbarLayout.style";

interface Props{
  children: React.ReactNode
}

const NavbarLayout: React.FC<Props> = ({ children }) => {
  return(
    <Navigation>
      <Container>
        <Row alignItems="center" height="100%">
          {children}
        </Row>
      </Container>
    </Navigation>
  )
}

export default NavbarLayout;