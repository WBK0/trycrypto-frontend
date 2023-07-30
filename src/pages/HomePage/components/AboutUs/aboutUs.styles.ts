import styled from "styled-components";

interface IWrapper{
  special?: boolean;
}

export const Wrapper = styled.div<IWrapper>`
  width: 100%;
  padding: 20px;
  height: 350px;
  background-color: var(--font-yellow);
  border-radius: 12px;
  color: black;
  margin-top: ${props => props.special ? '100px' : '0px'};
`

export const Header = styled.h3`
  text-align: center;
  font-size: 48px;
  margin-bottom: 50px;
`

export const ItemHeader = styled.h4`
  font-size: 30px;
  text-align: center;
  margin-top: 10px;
  font-weight: 800;
  font-family: 'Roboto Condensed', sans-serif;
`

export const ItemContent = styled.p`
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
`