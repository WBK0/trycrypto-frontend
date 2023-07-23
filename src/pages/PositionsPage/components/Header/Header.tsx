import { Heading, Instrument, Wrapper } from "./header.styles";

interface IHeader{
  params: string;
}

const Header : React.FC<IHeader> = ({ params }) => {
  const parts = params.split("/");
  return(
    <Wrapper>
      <Instrument>{parts[0].toUpperCase()}</Instrument>
      <Heading>Active {parts[0]} {parts[1]}</Heading>
    </Wrapper>
  )
}

export default Header;