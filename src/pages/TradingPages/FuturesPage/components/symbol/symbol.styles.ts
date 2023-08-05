import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  color: white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 20px;
  font-weight: 500;
  &:hover{
    @media screen and (min-width: 1000px){
      border-bottom: 1px solid var(--border-dark);
    }
    border-bottom: 10px solid var(--theme-primary);
  }
  border-bottom: 10px solid var(--theme-dark);
  @media screen and (min-width: 1000px){
    border: 1px solid var(--border-dark);
  }
  @media screen and (min-width: 1400px){
    border-right: none;
  }
  
`

export const CurrenciesWrapper = styled.div`
  display: none;
  position: absolute;
  top: 0px;
  width: 100%;
  margin-top: 58px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 999;
  flex-wrap: wrap;
  padding: 4px 0px 8px 0px;
  &::-webkit-scrollbar{
   width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
  }
  background-color: var(--theme-primary);
  ${Wrapper}:hover & {
    display: flex;
  }
`

export const DataWrapper = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  font-size: 14px;
  padding: 2px 5px 2px 5px;
  &:hover{
    color: var(--font-yellow);
  }
`

export const Name = styled.span`
  width: 37.5%;
  color: rgb(210, 210, 210);
  ${DataWrapper}:hover & {
    color: var(--font-yellow);
  }
`

export const Change = styled.span`
  width: 37.5%;
  text-align: right;
  color: ${props => props.color};
  ${DataWrapper}:hover & {
    color: var(--font-yellow);
  }
`

export const Price = styled.span`
 width: 25%;
 text-align: center;
 color: ${props => props.color};
 ${DataWrapper}:hover & {
    color: var(--font-yellow);
  }
`

export const SearchBar = styled.input`
  height: 25px;
  width: 97%;
  background-color: rgb(42, 45, 53);
  border: none;
  border-radius: 6px;
  margin: 0 auto;
  margin-bottom: 6px;
  color: white;
  outline: none;
  font-size: 14px;
`