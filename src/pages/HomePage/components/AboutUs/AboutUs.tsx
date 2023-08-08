import { Col } from "../../../../shared/col";
import { Row } from "../../../../shared/row";
import AboutDescription from "./components/AboutDescription";
import Items from "./components/Items";

// AboutUs component - renders the about us section of the home page
const AboutUs = () => {
  return(
    <Row mt="10vh" mb="100px" height="100vh" alignItems="center">
      <Col xs={100} lg={50} pr="0px">
        <AboutDescription />
      </Col>
      <Col xs={100} lg={50} pr="0px" >
        <Items />
      </Col>
    </Row>
  )
}

export default AboutUs;