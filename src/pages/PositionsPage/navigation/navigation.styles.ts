import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  color: white;
  border: solid rgb(66, 66, 66);
  border-width: 0px 2px 0px 0px;
  height: calc(100vh - 60px);
`

export const ItemWrapper = styled(Link)`
  text-decoration: none;
  height: 50px;
  display: flex;
  align-items: center;
  &:hover{
    background-color: rgb(38, 38, 38);
  }
`

export const Item = styled.div`
  padding-left: 15px;
  font-size: 18px;
  font-weight: 500;
  -webkit-text-stroke: 1px;
  color: rgb(140, 140, 140);
`

export const Text = styled.span`
  padding-left: 12px;
  font-size: 14px;
  -webkit-text-stroke: 0px;
  color: white;
  font-weight: 400;
`