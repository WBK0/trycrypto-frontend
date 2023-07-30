import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
`

export const Tiles = styled.div`
  background-color: var(--theme-dark);
  color: white;
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 10px;
  margin: 10px;
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const TilesWrapper = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent};
  flex-wrap: wrap;  
  flex-direction: column;
`

export const Heading = styled.h1`
  font-size: 34px;
`

export const Amount = styled.h2`
  font-size: 28px;
`

export const Description = styled.p`
  font-size: 20px;
`