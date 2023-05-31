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

export const DataWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  font-size: 14px;
`

export const Name = styled.span`
  width: 37.5%;
`

export const Change = styled.span`
 width: 25%;
 text-align: center;
`

export const Price = styled.span`
 width: 37.5%;
 text-align: right;
`