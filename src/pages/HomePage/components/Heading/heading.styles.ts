import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Header = styled.h1`
  font-size: 45px;
`

export const SubHeader = styled.h2`
  font-size: 40px;
  
`

export const RiskHeader = styled.h3`
  color: var(--font-yellow);
  font-size: 40px;
  font-weight: 700;
`

export const RegisterButton = styled.button`
  border: none;
  width: 300px;
  height: 50px;
  font-size: 20px;
  background-color: var(--font-yellow);
  color: white;
  font-weight: 600;
  margin-top: 50px;
  border-radius: 7px;
  &:hover{
    opacity: 0.85;
  }
`