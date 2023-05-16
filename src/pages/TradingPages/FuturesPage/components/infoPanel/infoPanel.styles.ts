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

export const CloseButton = styled.button`
  border: none;
  background-color: red;
  color: white;
  border-radius: 6px;
  padding: 5px 9px 5px 9px;
  font-weight: 500;
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

export const Quantity = styled.h1`
  text-align: center;
  margin-bottom: 25px;
`

export const RangeInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;  
  background-color: #b3b3b3;  
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%; 
    background-color: #3b3e47;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%; 
    background-color: grey;
    cursor: pointer;
  }
`

export const Info = styled.p`
  padding-top: 30px;
  font-size: 15px;
`

export const InfoPNL = styled.span`
  color: ${props => props.color};
`