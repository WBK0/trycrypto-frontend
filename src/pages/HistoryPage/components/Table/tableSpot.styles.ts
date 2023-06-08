import styled from "styled-components";

export const TableWrapper = styled.div`
  background-color: var(--theme-dark);
  margin-top: 30px;
  width: 100%;
  padding: 12px 0px 12px 0px; 
`

export const Table = styled.table`
  width: 100%;
`


export const THead = styled.thead`
  border-bottom: 2px solid var(--font-grey);
  /* display: block; */
`

export const Tr = styled.tr`
  height: 45px;
  border-bottom: 1px solid rgb(70, 70, 70);
`

export const Th = styled.th`
  padding-left: 12px;
  padding-bottom: 6px;
`

export const TBody = styled.tbody`
  overflow-y: scroll;
  max-height: 400px;
`

interface ITd{
  weight?: number;
}

export const Td = styled.td<ITd>`
  padding-left: 12px;
  
  color: ${props => props.color || 'white'};
  font-weight: ${props => props.weight || 400}
`