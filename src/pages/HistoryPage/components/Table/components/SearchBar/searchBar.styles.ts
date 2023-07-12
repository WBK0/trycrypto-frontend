import styled from "styled-components";


export const InputWrapper = styled.div`
  padding: 10px;
  
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  @media screen and (min-width: 1000px){
    width: 25%;
  }
`

export const Input = styled.input`
  height: 40px;
  background-color: var(--theme-dark);
  border: none;
  border: 2px solid transparent;
  width: 100%;
  color: white;
  border-radius: 0px 6px 6px 0px;
  font-size: 21px;
  border-left: 0px;
  outline: none;
  &:focus{
    border: 2px solid var(--font-grey);
    border-left: 0px;
  }  
`

export const Loupe = styled.span`
  display: flex;
  align-items: center;
  background-color: var(--theme-dark);
  height: 40px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 6px 0px 0px 6px;
  color: rgb(180, 180, 180);
  font-size: 15px;
  cursor: text;
  border: 2px solid transparent;
  border-right: 0px;
  ${InputWrapper}:focus-within & {
    border: 2px solid var(--font-grey);
    border-right: 0px;
  }
`

export const Button = styled.button`
  height: 40px;
  margin: 10px;
  padding: 0px 15px 0px 15px;
  border: 2px solid transparent;
  background-color: var(--font-yellow);
  color: white;
  font-weight: 500;
  border-radius: 6px;
  outline: none;
  &:hover{
    background-color: var(--theme-dark);
    border: 2px solid var(--font-grey);
  }
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`