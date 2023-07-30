import { Link } from "react-router-dom";
import { Header, RegisterButton, SubHeader, Wrapper } from "./heading.styles";

const Heading = () => {
  return(
    <Wrapper>
      <Header>Welcome to TRYCRYPTO</Header>
      <SubHeader>Trade without risk!</SubHeader>
      <Link to='/signup'>
        <RegisterButton><i className="bi bi-person-fill"></i> Register now</RegisterButton>
      </Link>
    </Wrapper>
  )
}

export default Heading;