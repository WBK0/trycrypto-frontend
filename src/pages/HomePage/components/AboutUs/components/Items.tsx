import { Column, ItemDescription, ItemHeader, ItemNumber, ItemWrapper, Wrapper } from "../aboutUs.styles";

// Items component - renders the items of the about us section
const Items = () => {
  return(
    <Wrapper>
      <Column>
        <ItemWrapper>
          <ItemNumber>01</ItemNumber>
          <ItemHeader>No risk</ItemHeader>
          <ItemDescription>You receive 10,000 virtual USDT to start your adventure</ItemDescription>
        </ItemWrapper>
        <ItemWrapper>
          <ItemNumber>02</ItemNumber>
          <ItemHeader>Real-time data</ItemHeader>
          <ItemDescription>Prices on the platform are taken live from Binance.com</ItemDescription>
        </ItemWrapper>
      </Column>
      {/* second prop is used to style the second column differently */}
      <Column second={true}> 
        <ItemWrapper>
          <ItemNumber>03</ItemNumber>
          <ItemHeader>Improve skills</ItemHeader>
          <ItemDescription>Practice and create even better positions with our demo</ItemDescription>
        </ItemWrapper>
        <ItemWrapper>
          <ItemNumber>04</ItemNumber>
          <ItemHeader>Data analysis</ItemHeader>
          <ItemDescription>Analyze data on charts taken from tradingview.com</ItemDescription>
        </ItemWrapper>
      </Column>
    </Wrapper>
  )
}

export default Items;