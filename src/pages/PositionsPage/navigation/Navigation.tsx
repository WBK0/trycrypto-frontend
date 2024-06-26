import { Item, ItemWrapper, Wrapper, Text } from "./navigation.styles";

// Navigation component - renders the navigation
const Navigation = () => {
  return(
    <Wrapper>
      <ItemWrapper to={'/positions/spot/orders'}>
        <Item>
        <i className="bi bi-wallet2"></i> 
        <Text>Spot orders</Text>
        </Item>
      </ItemWrapper>
      <ItemWrapper to={'/positions/futures/orders'}>
        <Item>
        <i className="bi bi-card-list"></i>
        <Text>Futures orders</Text>
        </Item>
      </ItemWrapper>
      <ItemWrapper to={'/positions/futures/positions'}>
        <Item>
        <i className="bi bi-box-arrow-in-up-right"></i>
        <Text>Futures positions</Text>
        </Item>
      </ItemWrapper>
    </Wrapper>
  )
}

export default Navigation;