import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 300px;
  margin-bottom: 10px;
  color: white;
  @media screen and (min-width: 1000px){
    border: 1px solid var(--border-dark);
    border-top: none; 
  }
`

export const SelectBar = styled.div`
  margin-top: 7px;
`

interface ISelectButton{
  active: boolean;
}

export const SelectButton = styled.button<ISelectButton>`
  background-color: transparent;
  border: none;
  color: ${props => props.active ? 'var(--font-yellow)' : 'rgb(196, 196, 196)'};
  margin-right: 10px;
  margin-left: 5px;
  font-weight: 500;
  font-size: 15px;
`

export const Table = styled.table`
  margin-top: 10px;
  margin-left: 10px;
`

export const THead = styled.thead`
  font-size: 13px;
`

export const Tr = styled.tr`
  height: 50px;
`

export const TBody = styled.tbody`
  font-size: 14px;
`

export const Type = styled.td`
  color: ${props => props.color};
  font-weight: 600;
  width: 80px;
`

export const Pnl = styled.td`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  width: 200px;
`

export const PnlText = styled.span`
  word-wrap: break-word;
  width: 100%;
  color ${props => props.color};
`

export const Td = styled.td`
  width: 200px;
`

export const Th = styled.th`
  
`

export const InputTd = styled.input`
  background-color: transparent;
  border: none;
  color: white;
  width: 50%;
`