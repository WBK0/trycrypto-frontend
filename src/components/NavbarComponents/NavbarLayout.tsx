import { Container } from "../../shared/container";
import { Row } from "../../shared/row";
import { Navigation } from "./styles/navbarLayout.style";

// Props for the NavbarLayout component
interface Props{
  children: React.ReactNode
}

// NavbarLayout component - layout for the navbar
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