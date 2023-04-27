import styled from "styled-components";

export const Balance = styled.p`
  margin-top: 12px;
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
  width: 100%;
  height: 30px;
  padding: 0px;
  outline: none;
  margin-bottom: 5px;
`

export const OrderButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background-color: #0bb50b;
  border: none;
  color: white;
  font-weight: 500;
  &:hover{
    background-color: #0b960b;
  }
`