import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 20px;
  min-height: 500px;
  width: 100%; 
  background-color: var(--theme-dark);
  margin: 0 auto;
  margin-top: 150px;
  padding: 30px;
  margin-bottom: 500px;
  @media screen and (min-width: 1000px) {
    width: 40%;
  }
`

export const Header = styled.h5`
  text-align: center;
  font-family: 'Gilroy-bold';
  font-size: 40px;
  margin-bottom: 30px;
  margin-top: 30px;
`

export const InputGroup = styled.div`
  display: flex; 
  width: 100%;
`

export const InputText = styled.input`
  width: 40px;
  background-color: transparent;
  color: white;
  border: solid var(--font-yellow);
  border-width: 0px 0px 1px 0px;
  outline: none;
  text-align: left;
  height: 60px;
  font-size: 16px;
  padding-right: 10px;
  font-family: 'Gilroy-Bold';
  @media screen and (min-width: 600px){
    font-size: 22px;
    width: 55px;
  }
`

export const Input = styled.input`
  width: calc(100% - 130px);
  background-color: transparent;
  color: rgb(200, 200, 200);
  border: solid var(--font-yellow);
  border-width: 0px 0px 1px 0px;
  outline: none;
  text-align: right;
  height: 60px;
  font-size: 26px;
  padding-right: 10px;
  font-family: 'Gilroy-Bold';
  @media screen and (min-width: 600px){
    width: calc(100% - 175px);
    font-size: 32px;
    padding-right: 20px;
  }
`

export const SelectContainer = styled.div`
  max-height: 100px;
`

export const Select = styled.div`
  width: 90px;
  background-color: transparent;
  color: rgb(141, 150, 158);
  border: solid var(--font-yellow);
  border-width: 0px 0px 1px 0px;
  outline: none;
  text-align: left;
  height: 60px;
  font-size: 15px;
  font-family: 'Gilroy-Bold';
  display: flex;
  align-items: center;
  justify-content: left;
  @media screen and (min-width: 600px){
    width: 120px;
    font-size: 22px;
  }
`

export const InputSelect = styled.select`
  width: 120px;
  background-color: transparent;
  color: rgb(141, 150, 158);
  border: solid var(--font-yellow);
  border-width: 0px 0px 1px 0px;
  outline: none;
  text-align: left;
  height: 60px;
  font-size: 28px;
  font-family: 'Gilroy-Bold';
  
`

export const OptionsContainer = styled.div`
  position: absolute;
  height: 200px;
  overflow-y: auto;
  width: 120px;
  color: white;
  ::-webkit-scrollbar{
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-track {
    background: var(--theme-dark);
  }
`

export const OptionsItem = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--theme-primary);
  height: 60px;
  font-size: 20px;
  padding-left: 5px;
  font-family: 'Gilroy-Bold';
  cursor: pointer;
  &:hover{
    background-color: var(--theme-dark)
  }
`

export const Icon = styled.img`
  margin-right: 10px;
`

export const Button = styled.button`
  background-color: #3f8f00;
  width: 100%;
  margin-top: 70px;
  height: 60px;
  border: none;
  border-radius: 30px;
  font-size: 28px;
  color: white;
  font-family: 'Gilroy-Medium';
  &:hover{
    opacity: 0.8;
  }
`

export const I = styled.i`
  text-align: right;
`