import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--theme-dark);
`

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  @media screen and (min-width: 800px) {
    justify-content: start;
  }
`

export const Logo = styled.img`
  max-width: 400px;
  width: 80%;
`

export const Copyright = styled.p`
  font-family: 'Gilroy-Light';
  color: rgb(180, 180, 180);
  text-align: center;
  font-size: 22px;
  margin-bottom: 0px;
`

export const IconsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  @media screen and (min-width: 800px){
    justify-content: flex-end;

  }
`

export const Icon = styled.i`
  font-size: 26px;
  color: white;
  text-align: right;
  padding: 10px;
  &:hover{
    color: var(--font-yellow);
    transition: 0.3s;
    cursor: pointer;
  }
`