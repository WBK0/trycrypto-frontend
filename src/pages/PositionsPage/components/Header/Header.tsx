import { Heading, Instrument, Wrapper } from "./header.styles";

// Header interface
interface IHeader{
  params: string;
}

// The Header component - renders the header
const Header : React.FC<IHeader> = ({ params }) => {
  // Split the params 
  const parts = params.split("/");
  return(
    <Wrapper>
      <Instrument>{parts[0].toUpperCase()}</Instrument>
      <Heading>Active {parts[0]} {parts[1]}</Heading>
    </Wrapper>
  )
}

export default Header;