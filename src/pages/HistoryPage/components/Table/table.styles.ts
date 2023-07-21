import styled from "styled-components"

export const TableWrapper = styled.div`
  background-color: var(--theme-dark);
  margin-top: 10px;
  width: 100%;
  overflow-x: auto;
  
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
  min-width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  
`

export const THead = styled.thead`
  
  padding-right: 5px;
  display: block;
`

export const Tr = styled.tr`
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
`

export const Th = styled.th`
  /* padding-left: 12px; */
  padding-bottom: 0px;
  flex: 1;
  min-width: 130px;
  border-bottom: 2px solid var(--font-grey);
  height: 45px;
  display: flex;
  align-items: center;
`

export const TBody = styled.tbody`
  display: block;
  overflow-y: scroll;
  overflow-x: hidden;
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

export const Td = styled.td`
  /* padding-left: 12px; */
  flex: 1;
  min-width: 130px;
  border-bottom: 1px solid rgb(70, 70, 70);
  height: 45px;
  display: flex;
  align-items: center;
`

export const TypeTh = styled.th`
  padding-left: 12px;
  padding-bottom: 0px;
  min-width: 70px;
  border-bottom: 2px solid var(--font-grey);
  height: 45px;
  display: flex;
  align-items: center;
`

export const Type = styled.td`
  color: ${props => props.color || 'white'};
  font-weight: 500;
  min-width: 70px;
  padding-left: 12px;
  border-bottom: 1px solid rgb(70, 70, 70);
  height: 45px;
  display: flex;
  align-items: center;
`

export const Pair = styled.td`
  padding-left: 12px;
  min-width: 110px;
  border-bottom: 1px solid rgb(70, 70, 70);
  height: 45px;
  display: flex;
  align-items: center;
`

export const PairTh = styled.th`
  padding-left: 12px;
  padding-bottom: 0px;
  min-width: 110px;
  border-bottom: 2px solid var(--font-grey);
  height: 45px;
  display: flex;
  align-items: center;
`

export const Leverage = styled.td`
  padding-left: 12px;
  min-width: 100px;
  border-bottom: 1px solid rgb(70, 70, 70);
  height: 45px;
  display: flex;
  align-items: center;
`

export const LeverageTh = styled.th`
  padding-left: 12px;
  padding-bottom: 0px;
  min-width: 100px;
  border-bottom: 2px solid var(--font-grey);
  height: 45px;
  display: flex;
  align-items: center;
`

export const Loading = styled.td`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const Loader = styled.div`
border: 3px solid transparent;
border-radius: 50%;
border-top: 3px solid #ffffff;
border-right: 3px solid #ffffff;
border-bottom: 3px solid #ffffff;
width: 25px;
height: 25px;
-webkit-animation: spin 0.7s linear infinite;
animation: spin 0.7s linear infinite;
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

export const Info = styled.td`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const Pnl = styled.td`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  color: ${props => props.color};
  min-width: 130px;
  border-bottom: 1px solid rgb(70, 70, 70);
  height: 45px;
  display: flex;
  align-items: center;
`

export const PnlText = styled.span`
  word-wrap: break-word;
  width: 100%;
  font-size: 14px;
`

export const DateTd = styled.td`
  padding-left: 12px;
  flex: 1;
  min-width: 160px;
  border-bottom: 1px solid rgb(70, 70, 70);
  height: 45px;
  display: flex;
  align-items: center;
`

export const DateTh = styled.th`
  padding-left: 12px;
  flex: 1;
  min-width: 160px;
  border-bottom: 2px solid var(--font-grey);
  height: 45px;
  display: flex;
  align-items: center;
`

export const StatusTh = styled.th`
  flex: 1;
  padding-left: 9px;
  padding-bottom: 0px;
  max-width: 55px;
  border-bottom: 2px solid var(--font-grey);
  height: 45px;
  display: flex;
  align-items: center;
`

export const StatusTd = styled.td`
  width: 55px;
  border-bottom: 1px solid rgb(70, 70, 70);
  height: 45px;
  padding-left: 9px;
  color: ${props => props.color == 'filled' && 'rgb(11, 181, 11)' || props.color == 'active' && 'rgb(130, 130, 130)' || props.color == 'canceled' && 'rgb(182, 34, 22)'};
  display: flex;
  align-items: center;
  justify-content: center;
`