import styled from "styled-components";

export const Wrapper = styled.div`
  color: #c4c4c4;
  width: 100%;
  border-bottom: 10px solid var(--theme-dark);
  height: 285px;
   
  @media screen and (min-width: 1000px) {
    border: 1px solid var(--border-dark);
    border-left: none;
    border-top: none; 
  }
`

export const Flex = styled.div`
  display: flex;  
  flex-direction: column;
  width: 100%;
  max-height: 280px;
  padding: 10px;
  overflow-y: scroll;
  overflow-anchor: auto;
  &::-webkit-scrollbar{
   width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
  }
`

export const TradeWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 20px;
`

export const Price = styled.span`
  flex: 1;
  font-size: 14px;
  color: ${props => props.color};
  font-weight: 500;
`

export const Quantity = styled.span`
  flex: 1;
  font-size: 14px;
  text-align: center;
`

export const Time = styled.span`
  flex: 1;
  font-size: 14px;
  text-align: right;
`