import styled from "styled-components";

export const Wrapper = styled.div`
  color: white;
  width: 100vw;
  margin: -12px;
  background-color: var(--theme-dark);
  min-height: 750px;
  @media screen and (min-width: 800px){
    min-height: 250px;
    position: absolute;
    left: 0;
    margin: 0px;
  }
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
  color: white;
  font-family: 'Gilroy-heavy';
  width: 100%;
`

export const ItemContent = styled.p`
  text-align: center;
  font-size: 28px;
  font-family: 'Gilroy-bold';
  width: 100%;
  color: rgb(180, 180, 180);
`