import { Description, Header, HeaderBreak, UpperHeader } from "../aboutUs.styles";

// AboutDescription component - renders the description of the about us section
const AboutDescription = () => {
  return(
    <>
      <UpperHeader>Our exchange</UpperHeader>
      <HeaderBreak />
      <Header>A ready-made solution to increase the efficiency of trading</Header>
      <Description>Boost trading efficiency with our automated solution. Real-time data insights, easy start, and no risk. Streamline your success today</Description>
    </>
  )
}

export default AboutDescription;