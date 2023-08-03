import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column-reverse;
  @media screen and (min-width: 800px){
    flex-direction: row;
  }
`

export const Header = styled.h1`
  font-size: 45px;
`

export const SubHeader = styled.h2`
  font-size: 40px;
`

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: column;
`

export const RiskHeader = styled.h3`
  color: var(--font-yellow);
  font-size: 40px;
  font-weight: 700;
`

export const RegisterButton = styled.button`
  border: none;
  width: 100%;
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
  @media screen and (min-width: 800px) {
    width: 300px;
  }
`