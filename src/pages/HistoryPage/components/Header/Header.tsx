import { useState } from "react";
import { Button, Heading, Hr, Wrapper } from "./header.styles";
import { Link, useParams } from "react-router-dom";

// Header interface
interface IHeader{
  instrument?: string;
}

// The Header component - renders the header
const Header : React.FC<IHeader> = ({ instrument }) => {
  const { type } = useParams();
  const [historyType, setHistoryType] = useState(type == 'trades' ? 0 : 1);

  return(
    <Wrapper>
      <Heading>Last trades</Heading>
      <Link to={`/history/${instrument}/trades`}>
        <Button active={historyType == 0 ? true : false} onClick={() => setHistoryType(0)} >Trades</Button>
      </Link>
      <Link to={`/history/${instrument}/orders`}>
        <Button active={historyType == 1 ? true : false} onClick={() => setHistoryType(1)} >Orders</Button>
      </Link>
      <Hr></Hr>
    </Wrapper>
  )
}

export default Header;