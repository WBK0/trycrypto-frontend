import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 130px);
`

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 500px;
`

export const Logo = styled.img`
  width: 100%;
`

export const Header = styled.h1`
  margin-top: 20px;
  font-family: 'Gilroy-Bold';
`

export const Description = styled.p`
  font-family: 'Gilroy-Light';
  text-align: center;
  margin-top: 20px;
`

export const BackButton = styled(Link)`
  text-decoration: none;
  color: var(--font-yellow);
  font-family: 'Gilroy-Bold';
  font-size: 18px;
  text-transform: uppercase;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  &:hover{ 
    color: rgb(180,180,180);
}

`