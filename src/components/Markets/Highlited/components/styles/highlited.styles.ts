import { Link } from "react-router-dom";
import styled from "styled-components";

export const HighlitedLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover{
    color: white;
  }
`

export const ItemWrapper = styled.div`
  background-color: var(--theme-dark);
  border-radius: 15px;
  padding-left: 5px;
  padding-top: 15px;
  padding-right: 5px;
  padding-bottom: 15px;
  &:hover{
    background-color: rgb(25, 25, 25);
  }
`

export const Heading = styled.p`
  color: rgb(122, 122, 122);
  font-weight: 500;
  font-size: 14px;
  margin-left: 5px;
`

export const IconWrapper = styled.div`
  flex: 1;
`

export const PriceWrapper = styled.div`
  flex: 1;
  text-align: center;
`

export const ChangeWrapper = styled.div`
  flex: 1;
  text-align: right;
`

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 8px;
  padding-left: 8px;
  &:hover{
    background-color: #0a0e15;
  }
`