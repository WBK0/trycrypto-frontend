import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-right: 0px;
`

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Input = styled.input`
  flex: 1;
  width: 16.66%;
  margin: 5px;
  height: 60px;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: rgb(80, 80, 80);
  color: white;
  font-size: 32px;
  text-align: center;
  caret-color: transparent;
  &:focus{
    background-color: rgb(50, 50, 50)
  }
`

export const Heading = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 36px;
`

export const Text = styled.p`
  width: 100%;
  font-size: 13px;
  font-family: 'Poppins', sans-serif;
  text-align: center;
`

export const Button = styled.button`
  margin-top: 30px;
  width: 150px;
  border: none;
  padding: 7px 23px 7px 23px;
  font-size: 18px;
  font-weight: 500;
  background-color: var(--font-yellow);
  color: white;
  border-radius: 7px;
  &:disabled{
    opacity: 0.5
  }
`

export const LoadingContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  background-color: black;
  opacity: 0.85;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

export const Loader = styled.div`
  border: 10px solid transparent;
  border-radius: 50%;
  border-top: 10px solid #ffffff;
  border-right: 10px solid #ffffff;
  border-bottom: 10px solid #ffffff;
  width: 80px;
  height: 80px;
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