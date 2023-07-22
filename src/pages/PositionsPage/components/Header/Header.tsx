import { Heading, Instrument, Wrapper } from "./header.styles";

const Header = ({ params }) => {
  const parts = params.split("/");
  return(
    <Wrapper>
      <Instrument>{parts[0].toUpperCase()}</Instrument>
      <Heading>Active {parts[0]} {parts[1]}</Heading>
    </Wrapper>
  )
}

export default Header;