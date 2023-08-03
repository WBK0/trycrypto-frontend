import { Col } from "../../../../shared/col";
import { Row } from "../../../../shared/row";
import { Column, Description, Header, HeaderBreak, ItemDescription, ItemHeader, ItemNumber, ItemWrapper, UpperHeader, Wrapper } from "./aboutUs.styles"

const AboutUs = () => {
  return(
    <Row mt="10vh" mb="100px" height="100vh" alignItems="center">
      <Col xs={100} lg={50} pr="0px">
        <UpperHeader>Our exchange</UpperHeader>
        <HeaderBreak />
        <Header>A ready-made solution to increase the efficiency of trading</Header>
        <Description>Boost trading efficiency with our automated solution. Real-time data insights, easy start, and no risk. Streamline your success today</Description>
      </Col>
      <Col xs={100} lg={50} pr="0px" >
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
      </Col>
    </Row>
  )
}

export default AboutUs;