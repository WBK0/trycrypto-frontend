import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 810px;
  padding: 0px;
  background-color: #141921;
  border-bottom: 10px solid var(--theme-dark);
  @media screen and (min-width: 1000px) {
    height: 760px;
    border: 1px solid var(--border-dark);
    border-left: none;
  }
  display: flex;
  flex-wrap: wrap;
  color: white;
  flex-direction: column;
`

export const LeverageWrapper = styled.div`
  width: 100%;
  padding: 12px;
`

export const LeverageButton = styled.button`
  height: 30px;
  width: 100%;
  background-color: #283242;
  border: none;
  color: white;
  border-radius: 6px;
  &:hover{
    background-color: #1d2430;
  }
`

export const OrderTypeWrapper = styled.div`
  width: 100%;
`

interface IOrderTypeLink{
  active: boolean;
}

export const OrderTypeLink = styled.span<IOrderTypeLink>`
  padding-left: 12px;
  cursor: pointer;
  color: ${props => props.active ? 'var(--font-yellow)' : 'white'};
  font-weight: 500;
`

export const Wallet = styled.div`
  padding-left: 12px;
  padding-top: 12px;
`

export const WalletText = styled.span`
  color: #455c80;
  margin-right: 6px;
  font-size: 14px;
  font-weight: 500;
`

export const Balance = styled.span`
  font-size: 15px;
`

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  padding: 12px;
  padding-bottom: 0px;
`

export const Input = styled.input`  
  flex: 1 1 auto;
  background-color: #2A2D35;
  color: white;
  border: none;
  text-align: right;
  padding-right: 5px;
  height: 45px;
  font-size: 16px;
  line-height: 28px;
  width: 1%;
  z-index: 1;
  border: 2px solid transparent;
  &:focus{
    outline: none;
    border-color: rgb(90, 90, 90);
  }
`

export const InputText = styled.span`
  background-color: #2A2D35;
  color: #6d6e73;
  border: none;
  height: 45px;
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 7px 0px 0px 7px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 28px;
  width: 79px;
`

export const InputSymbol = styled.span`
  background-color: #2A2D35;
  color: white;
  border: none;
  height: 45px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 0px 7px 7px 0px;
  text-align: center;
  font-size: 16px;
  line-height: 28px;
`

export const RangeWrapper = styled.div`
  padding: 12px;
  padding-bottom: 0px;
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

export const PriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
`

export const PriceWrapper = styled.div`
  display: flex;  
  flex-wrap: wrap;
`

export const PriceText = styled.span`
  margin-right: 5px;
  color: #455c80;
  font-size: 15px;
  font-weight: 500;
`

export const Price = styled.span`
  font-size: 15px;
  word-wrap: break-word;
  
`

export const Hr = styled.hr`
  width: calc(100% - 24px);
  margin: 0 auto;
  margin-top: 12px;
  margin-bottom: 12px;
  color: #455c80;
`

export const OrderButtons = styled.div`
  display: flex;
  justify-content: space-between;
`

interface IButton {
  orderType: 'buy' | 'sell';
}

export const Button = styled.button<IButton>`
  width: calc(50% - 12px);
  margin-top: 20px;
  margin-left: ${(props) => props.orderType === 'buy' ? '12px' : '0px'};
  margin-right: 12px;
  height: 36px;
  border-radius: 6px;
  background-color: ${(props) => props.orderType === 'buy' ? 'rgb(7, 119, 3)' : '#B62216'};
  border: none;
  color: white;
  font-size: 14px;
  font-weight: 500;
  &:hover{
    background-color: ${(props) => props.orderType === 'buy' ? 'rgb(7, 100, 3)' : '#951409'};
  }
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

export const Close = styled.button`
  position: absolute;
  top: 6px;
  right: 5px;
  background-color: transparent;
  color: white;
  border: none;
  font-weight: bolder;
`

export const LeverageLevel = styled.h1`
  text-align: center;
  margin-bottom: 25px;
`

export const Warning = styled.span`
  color: #DC143C;
  margin-top: 22px;
`

export const SaveButton = styled.button`
  margin-top: 15px;
  background-color: #b3b3b3;
  border: none;
  padding: 3px 25px 3px 25px;
  margin: 0 auto;
  margin-top: 20px;
  font-weight: 500;
  border-radius: 6px;
`