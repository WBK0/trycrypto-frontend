import styled from "styled-components";

export const Wrapper = styled.div`
  color: white;
  width: 100vw;
  position: absolute;
  left: 0;
  background-color: var(--theme-dark);
  height: 250px;
`

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 30px;
  height: 250px;
`

export const ItemHeader = styled.h5`
  text-align: center;
  font-size: 50px;
  color: var(--font-yellow);
  font-family: 'Gilroy-heavy';
  width: 100%;
`

export const ItemContent = styled.p`
  text-align: center;
  font-size: 28px;
  font-family: 'Gilroy-bold';
  width: 100%;

`