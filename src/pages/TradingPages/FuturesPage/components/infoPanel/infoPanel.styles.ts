import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
  color: white;
  @media screen and (min-width: 1000px){
    border: 1px solid var(--border-dark);
    border-top: none; 
  }
  &::-webkit-scrollbar{
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: var(--theme-primary);
  }
`

export const Content = styled.div`
  flex-grow: 1;
`

export const SelectBar = styled.div`
  width: 100%;
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
  margin-top: 5px;
  margin-left: 10px;
  overflow-x: auto;
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
  min-width: 60px;
`

export const Pnl = styled.td`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  width: 20vw;
  min-width: 120px;
  color: ${props => props.color};
`

export const PnlText = styled.span`
  word-wrap: break-word;
  width: 100%;
`

export const Td = styled.td`
  min-width: 120px;
  width: 20vw;
`

export const Th = styled.th`
  
`

export const Buttons = styled.td`
  width: 20vw;
  min-width: 160px;
`


export const UpdateButton = styled.button`
  border: none;
  background-color: darkcyan;
  color: white;
  border-radius: 6px;
  padding: 5px 9px 5px 9px;
  font-weight: 500;
  margin-right: 6px;
  font-size: 14px;
`

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background-color: var(--theme-primary);
  border-radius: 8px;
  padding: 25px;
  padding-top: 45px;
  width: 400px;
  height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const CloseButton = styled.button`
  border: none;
  background-color: red;
  color: white;
  border-radius: 6px;
  padding: 5px 9px 5px 9px;
  font-weight: 500;
  font-size: 14px;
`

export const Text = styled.div`
  text-align: center;
  width: 100%;
  font-size: 17px;
  margin-top: 25px;
  color: rgb(200,200,200);
`

export const LoginWrapper = styled.div`
  display: flex;
  height: calc(100% - 40px);
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const LoginText = styled.span`
  font-size: 14px;
  padding: 20px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
`

export const LoginLink = styled(Link)`
  color: var(--font-yellow);
  text-decoration: none;
  &:hover{
    color: var(--font-yellow);
  }
`