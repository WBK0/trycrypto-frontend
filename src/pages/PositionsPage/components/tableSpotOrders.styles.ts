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

export const SubTd = styled.td`
  height: 50px;
  min-width: ${props => props.width};
  color: ${props => props.color};
`

export const SubTh = styled.th`
  font-weight: 400;
  height: 30px;
`

export const SubTr = styled.tr`
  margin-left: 30px;
  /* th:first-child, td:first-child{
    padding-left: 30px;
  } */
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
  ${Tr}:hover {
    background-color: var(--theme-dark);
  }
`

export const CloseButton = styled.button`
  background-color: rgb(182, 34, 22);
  border: none;
  color: white;
  padding: 3px 12px 3px 12px;
  border-radius: 7px;
  font-weight: 500;
`

export const UpdateButton = styled.button`
  background-color: darkcyan;
  border: none;
  color: white;
  padding: 3px 12px 3px 12px;
  border-radius: 7px;
  font-weight: 500;
  margin-right: 10px;
`

export const Pnl = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  min-width: 120px;
  max-width: 200px;
  color: ${props => props.color};
`

export const PnlText = styled.span`
  word-wrap: break-word;
  width: 100%;
`

export const SubSwitch = styled.td`
  min-width: 30px;
  max-width: 30px;
  height: 50px;
  border: solid rgb(66, 66, 66);
  border-width: 0px 0px 1px 0px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`

export const NoOpened = styled.div`
  width: 100%;
  text-align: center;
  color: rgb(132, 142, 156);
  padding-top: 30px;
`