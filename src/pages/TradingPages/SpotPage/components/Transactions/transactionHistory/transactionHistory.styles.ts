import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 200px;
`

export const Table = styled.table`
  width: 100%;
  color: white;
  

`

export const THead = styled.thead`

`

export const TBody = styled.tbody`

`

export const Tr = styled.tr`
  border-bottom: 1px solid var(--border-dark);
`

interface ITd{
  weight: string;
}

export const Td = styled.td<ITd>`
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: ${props => props.color == 'buy' && 'rgb(7, 119, 3)' || props.color == 'sell' && 'rgb(119, 3, 3)'};
  font-weight: ${props => props.weight};
  min-width: ${props => props.width};
  font-size: 16px;
`

interface ITh{
  width: number;
}
export const Th = styled.th<ITh>`
  padding-left: 10px;
  font-weight: 400;
  width: ${props => props.width + '%'};
`

export const TableWrapper = styled.div`
  margin-top: 20px;
  max-height: 300px;
  overflow: auto;
  &::-webkit-scrollbar{
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
  }
`

export const MoreHistory = styled.div`
  color: white;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 10px;
`

export const HistoryHeader = styled.span`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`

export const HistoryLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: 500;
  background-color: var(--font-yellow);
  padding: 4px 15px 4px 15px;
  border-radius: 6px;
  margin-top: 5px;
  &:hover{
    color: var(--font-yellow);
    background-color: transparent;
  }
  margin-bottom: 20px;
`

export const EmptyHistoryHeader = styled.span`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: rgb(150, 150, 150);
  font-weight: 500;
`