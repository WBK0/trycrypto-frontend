import styled from "styled-components";

export const TableWrapper = styled.div`
  background-color: var(--theme-dark);
  margin-top: 10px;
  width: 100%;
  overflow: hidden;
`

export const TableContainer = styled.div`
  height: 400px;
  width: 100%;
`

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--theme-dark);
  z-index: 1;
`

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`

export const THead = styled.thead`
  border-bottom: 2px solid var(--font-grey);
  padding-right: 5px;
  display: block;
`

export const Tr = styled.tr`
  height: 45px;
  border-bottom: 1px solid rgb(70, 70, 70);
  width: 100%;
  display: flex;
  align-items: center;
`

export const Th = styled.th`
  padding-left: 12px;
  padding-bottom: 0px;
  flex: 1;
`

export const TBody = styled.tbody`
  display: block;
  overflow-y: scroll;
  &::-webkit-scrollbar{
   width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: var(--theme-dark);
  }
  width: 100%;
  height: 50vh;
  tr:hover {
    background-color: var(--theme-primary);
  }
`

interface ITd{
  weight?: number;
}

export const Td = styled.td<ITd>`
  padding-left: 12px;
  flex: 1;
  color: ${props => props.color || 'white'};
  font-weight: ${props => props.weight || 400};
`