import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--theme-primary);
`

export const ContainerFluid = styled.div`
  padding-top: 60px;
  display: flex;
`

export const NavbarLeft = styled.div`
  width: 230px;
  flex: 0 0 auto;
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  overflow-y: auto;
`

export const Content = styled.div`
  width: calc(100% - 230px);
  flex: 1;
`