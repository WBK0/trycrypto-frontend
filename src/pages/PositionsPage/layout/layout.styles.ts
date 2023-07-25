import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--theme-primary);
`

export const ContainerFluid = styled.div`
  padding-top: 60px;
  display: flex;
`

interface INavbarLeft{
  show: boolean;
}

export const NavbarLeft = styled.div<INavbarLeft>`
  width: 100%;
  flex: 0 0 auto;
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  background-color: var(--theme-dark);
  top: 60px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  @media screen and (min-width: 800px){
    background-color: transparent;
    display: block;
    position: sticky;
    width: 230px;
  }
`

export const Content = styled.div`
  width: calc(100% - 230px);
  flex: 1;
  /* margin-top: 40px;
  @media screen and (min-width: 1000px){
    margin-top: 0px;
  } */
`

export const NavbarSwitch = styled.div`
  color: white;
  font-size: 32px;
  right: 10px;
  height: 150px;
  display: flex;
  align-items: center;
  position: absolute;
  @media screen and (min-width: 800px){
    display: none;
  }
`