import { Link } from "react-router-dom";
import styled from "styled-components";

export const MarketWrapper = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid rgb(90,90,90);
  border-left: none;
  border-top: none;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`

export const InputWrapper = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  margin-bottom: 5px;
`

export const Loupe = styled.span`
  display: flex;
  align-items: center;
  background-color: rgb(42, 45, 53);
  height: 25px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 6px 0px 0px 6px;
  color: rgb(180, 180, 180);
  font-size: 13px;
`

export const SearchBar = styled.input`
  height: 25px;
  width: 100%;
  background-color: rgb(42, 45, 53);
  border: none;
  border-radius: 0px 6px 6px 0px;
  color: white;
  outline: none;
  font-size: 14px;
`

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 449px;
  overflow-y: auto;
  &::-webkit-scrollbar{
   width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
  }
`

export const ItemWrapper = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  padding: 2px 10px 2px 10px;
  color: white;
  &:hover{
    background-color: rgb(90,90,90)
  }
`

export const Pair = styled.span`
  color: rgb(180, 180, 180);
  flex: 1 1 0%; 
  font-size: 13px;
`

export const Price = styled.span`
  color: ${props => props.color};
  flex: 1 1 0%; 
  font-size: 13px;
  font-weight: 500;
  text-align: right;
`

export const Change = styled.span`
  color: ${props => Number(props.color) >= 0 ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'};
  flex: 1 1 0%;
  font-size: 13px;
  text-align: right;
`

export const SpotLink = styled(Link)`
  text-decoration: none;
`