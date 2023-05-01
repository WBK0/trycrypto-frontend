import { Link } from "react-router-dom";
import styled from "styled-components";

export const OrderWrapper = styled.div`
  width: 100%;
  height: 666px;
  border-bottom: 10px solid var(--theme-dark);
  padding: 10px;
  @media screen and (min-width: 1000px){
    border: 1px solid var(--border-dark);
    border-top: none;
  }
  @media screen and (min-width: 800px) {
    height: 333px;
  }
`

export const Balance = styled.p`
  margin-top: 5px;
  font-size: 14px;
  color: white;
`

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  margin-bottom: 15px;
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
  color: white;
  border: none;
  height: 45px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 7px 0px 0px 7px;
  text-align: center;
  font-size: 16px;
  line-height: 28px;
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

export const RangeInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px; 
  margin-bottom: 20px; 
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

interface IOrderButton {
  orderType: 'buy' | 'sell';
}

export const OrderButton = styled.button<IOrderButton>`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background-color: ${(props) => props.orderType === 'buy' ? '#0bb50b' : '#B62216'};
  border: none;
  color: white;
  font-weight: 500;
  &:hover{
    background-color: ${(props) => props.orderType === 'buy' ? '#0b960b' : '#951409'};
  }
`

export const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background-color: rgb(42, 45, 53);
  border: none;
  color: white;
  font-weight: 500;
  cursor: default !important; 
`

export const LoginLink = styled(Link)`
  text-decoration: none;
  color: var(--font-yellow);
  &:hover{
    color: var(--font-yellow);
  }
`