import { Col } from "../../../../shared/col";
import { Row } from "../../../../shared/row";
import { Header, ItemContent, ItemHeader, Wrapper } from "./aboutUs.styles"

const AboutUs = () => {
  return(
    <Row mt="10vh">
      <Col xs={100}>
        <Header>Why us?</Header>
      </Col>
      <Col xs={33.33} pr="20px" pl="20px">
        <Wrapper special={true}>
          <ItemHeader>Practice Risk-Free!</ItemHeader>
          <ItemContent>
            Explore risk-free crypto trading with $10,000 in demo funds! Learn, practice, and refine your skills in a simulated environment. Develop winning strategies and build confidence before trading live. Start your crypto journey now!           
          </ItemContent>
        </Wrapper>
      </Col>
      <Col xs={33.33} pr="20px" pl="20px">
        <Wrapper >
          <ItemHeader>Practice Risk-Free!</ItemHeader>
          <ItemContent>
            Explore risk-free crypto trading with $10,000 in demo funds! Learn, practice, and refine your skills in a simulated environment. Develop winning strategies and build confidence before trading live. Start your crypto journey now!           
          </ItemContent>
        </Wrapper>
      </Col>
      <Col xs={33.33} pr="20px" pl="20px">
        <Wrapper special={true}>
          <ItemHeader>Practice Risk-Free!</ItemHeader>
          <ItemContent>
            Explore risk-free crypto trading with $10,000 in demo funds! Learn, practice, and refine your skills in a simulated environment. Develop winning strategies and build confidence before trading live. Start your crypto journey now!           
          </ItemContent>
        </Wrapper>
      </Col>
    </Row>
  )
}

export default AboutUs;