import styled from "styled-components"

export const CloseButton = styled.button`
  border: none;
  background-color: red;
  color: white;
  border-radius: 6px;
  padding: 5px 9px 5px 9px;
  font-weight: 500;
  font-size: 14px;
`

export const Info = styled.p`
  padding-top: 30px;
  font-size: 15px;
  padding-bottom: 10px;
`

export const InfoPNL = styled.span`
  color: ${props => props.color};
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

export const Quantity = styled.h1`
  text-align: center;
  margin-bottom: 25px;
`

export const InputLabel = styled.span`
  margin-top: 15px;
  font-size: 13px;
`

export const Input = styled.input`
  background-color: transparent;
  border: 2px solid grey;
  outline: none;
  color: white;
  border-radius: 5px;
  height: 40px;
  font-size: 18px;
  margin-top: 3px;
  padding-left: 6px;
  &:focus{
    border: 2px solid white;
  }
`

export const UpdateButton = styled.button`
  border: none;
  background-color: var(--font-yellow);
  color: white;
  border-radius: 6px;
  padding: 5px 9px 5px 9px;
  font-weight: 700;
  font-size: 15px;
  margin-top: 20px;
`