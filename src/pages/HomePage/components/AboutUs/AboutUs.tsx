import { Col } from "../../../../shared/col";
import { Row } from "../../../../shared/row";
import { Column, Description, Header, HeaderBreak, ItemDescription, ItemHeader, ItemNumber, ItemWrapper, UpperHeader, Wrapper } from "./aboutUs.styles"

const AboutUs = () => {
  return(
    <Row mt="10vh" height="100vh" alignItems="center">
      <Col xs={50}>
        <UpperHeader>Our exchange</UpperHeader>
        <HeaderBreak />
        <Header>A ready-made solution to increase the efficiency of trading</Header>
        <Description>Boost trading efficiency with our automated solution. Real-time data insights, easy start, and no risk. Streamline your success today</Description>
      </Col>
      <Col xs={50}>
        <Wrapper>
          <Column>
            <ItemWrapper>
              <ItemNumber>01</ItemNumber>
              <ItemHeader>No risk</ItemHeader>
              <ItemDescription>You receive 10,000 virtual USDT to start your adventure</ItemDescription>
            </ItemWrapper>
            <ItemWrapper>
              <ItemNumber>03</ItemNumber>
              <ItemHeader>Real-time data</ItemHeader>
              <ItemDescription>Prices on the platform are taken live from Binance.com</ItemDescription>
            </ItemWrapper>
          </Column>
          <Column style={{marginTop: '60px'}}>
            <ItemWrapper>
              <ItemNumber>02</ItemNumber>
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
      </Col>
    </Row>
  )
}

export default AboutUs;