import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 333px;
  border: 1px solid rgb(90, 90, 90);
  border-left: none;
  border-top: none;
  color: white;
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