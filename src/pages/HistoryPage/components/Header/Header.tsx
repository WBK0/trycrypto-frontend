import { Button, Heading, Hr, Wrapper } from "./header.styles";

const Header = () => {
  return(
    <Wrapper>
      <Heading>Last trades</Heading>
      <Button active={true}>Trades</Button>
      <Button active={false}>Orders</Button>
      <Hr></Hr>
    </Wrapper>
  )
}

export default Header;