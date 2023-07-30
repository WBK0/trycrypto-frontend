import { Amount, Description, Heading, Tiles, TilesWrapper, Wrapper } from "./heading.styles";

const HeadingTiles = () => {
  return(
    <Wrapper>
      <TilesWrapper justifyContent="end">
        <Tiles width="330px" height="250px">
          <Heading>Start with</Heading>
          <Amount>10000.00$</Amount>
          <Description>And try go to the moon</Description>
        </Tiles>
        <Tiles width="330px" height="220px">
          <Heading>Learn to trade</Heading>
          <Description>under controlled conditions</Description>
        </Tiles>
      </TilesWrapper>
      <TilesWrapper justifyContent="start">
        <Tiles width="250px" height="300px">
          <Amount>
            Discover
          </Amount>
          <Amount>
            New
          </Amount>
          <Amount>
            Opportunities
          </Amount>
        </Tiles>
        <Tiles width="250px" height="200px">
          <Heading>Real-Time</Heading>
          <Description>Market Insights</Description>
        </Tiles>
      </TilesWrapper>
    </Wrapper>
  )
}

export default HeadingTiles;