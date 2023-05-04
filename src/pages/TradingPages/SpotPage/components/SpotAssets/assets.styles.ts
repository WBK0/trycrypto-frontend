import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-height: 333px;
  color: white;
  border-bottom: 10px solid var(--theme-dark);
  @media screen and (min-width: 1000px) {
    min-height: 333px;
    border: 1px solid var(--border-dark);
    border-left: none;
    border-top: none;
  }
`

export const Header = styled.p`
  font-size: 15px;
  font-weight: 500;
`

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-anchor: auto;
  max-height: 333px;
  padding: 10px;
  &::-webkit-scrollbar{
   width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
  }

`

export const AssetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 28px;
`

export const CryptoSymbol = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: rgb(180, 180, 180);
`

export const Quantity = styled.span`
  font-size: 14px;
  font-weight: 400;
`

export const LinkContainer = styled.div`
  width: 100%;
  text-align: center;
`

export const LoginLink = styled(Link)`
  text-decoration: none;
  color: var(--font-yellow);
  font-weight: 500;
  &:hover{
    color: var(--font-yellow);
  }
`