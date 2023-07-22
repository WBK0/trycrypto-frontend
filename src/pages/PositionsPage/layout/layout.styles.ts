import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--theme-primary);
`

export const ContainerFluid = styled.div`
  padding-top: 60px;
  display: flex;
  flex-wrap: wrap;
`

export const NavbarLeft = styled.div`
  width: 230px;
`

export const Content = styled.div`
  width: calc(100% - 230px);
`