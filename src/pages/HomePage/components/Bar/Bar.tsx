import { Col } from "../../../../shared/col";
import { Container } from "../../../../shared/container";
import { Row } from "../../../../shared/row";
import { ItemContent, ItemHeader, ItemWrapper, Wrapper } from "./bar.styles";

const Bar = () => {
  return(
    <Wrapper>
      <Container>
        <Row>
          <Col xs={100} md={33.33}>
            <ItemWrapper>
              <ItemHeader>17</ItemHeader>
              <ItemContent>Supported cryptocurrencies</ItemContent>
            </ItemWrapper>
          </Col>
          <Col xs={100} md={33.33}>
            <ItemWrapper>
              <ItemHeader>2</ItemHeader>
              <ItemContent>Supported Markets</ItemContent>
            </ItemWrapper>
          </Col>
          <Col xs={100} md={33.33}>
            <ItemWrapper>
              <ItemHeader>185</ItemHeader>
              <ItemContent>users logging into the platform every day</ItemContent>
            </ItemWrapper>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default Bar;