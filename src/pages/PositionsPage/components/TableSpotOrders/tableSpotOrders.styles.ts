import styled from "styled-components";

export const Wrapper = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 8px;
  
`

export const TableWrapper = styled.div`
  overflow: auto;
  height: 100vh;
  ::-webkit-scrollbar{
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    background: var(--theme-primary);
  }
  @media screen and (min-height: 550px){
    height: calc(100vh - 300px);
  }
`

export const Table = styled.table`
  width: 100%;
`

export const THead = styled.thead`
  color: rgb(132, 142, 156);
  border: solid rgb(66, 66, 66);
  border-width: 0px 0px 1px 0px;
`

export const Tr = styled.tr`

`

export const Td = styled.td`
  height: 50px;
  border: solid rgb(66, 66, 66);
  border-width: 0px 0px 1px 0px;
  min-width: ${props => props.width};
  color: ${props => props.color};
`

export const Actions = styled.td`
  text-align: right;
  padding-right: 10px;
  height: 50px;
  border: solid rgb(66, 66, 66);
  border-width: 0px 0px 1px 0px;
`

export const Th = styled.th`
  font-weight: 400;
  padding-bottom: 8px;
`

export const ThActions = styled.th`
  font-weight: 400;
  padding-bottom: 8px;
  text-align: right;
  padding-right: 15px;
`

export const TBody = styled.tbody`
  color: white;
  margin-top: 20px;
`

export const CloseButton = styled.button`
  background-color: rgb(182, 34, 22);
  border: none;
  color: white;
  padding: 3px 12px 3px 12px;
  border-radius: 7px;
  font-weight: 500;
  
`