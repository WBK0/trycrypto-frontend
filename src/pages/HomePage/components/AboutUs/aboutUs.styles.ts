import styled from "styled-components";

export const UpperHeader = styled.h2`
  font-family: 'Gilroy-Bold';
`

export const HeaderBreak = styled.div`
  border-bottom: 5px solid var(--font-yellow);
  width: 65px;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const Header = styled.h1`
  font-family: 'Gilroy-Bold';
`

export const Description = styled.p`
  font-family: 'Gilroy-Medium';
  margin-top: 30px;
  font-size: 18px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const ItemWrapper = styled.div`
  background-color: var(--font-yellow);
  color: white;
  height: 320px;
  width: 100%;
  border-radius: 20px;
  margin: 15px;
  margin-left: 0px;
  margin-right: 0px;
  display: flex;
  padding: 25px;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  @media screen and (min-width: 800px){
    width: calc(100% - 30px);
  }
`

interface IColumn{
  second?: boolean;
}

export const Column = styled.div<IColumn>`
  width: 100%;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;  
  flex-direction: column;
  @media screen and (min-width: 800px){
    width: 50%;
    margin-top: ${props => props.second ? '60px' : '0px'};
  }
`

export const ItemNumber = styled.h4`
  font-size: 60px;
  font-family: 'Gilroy-Heavy';

`

export const ItemHeader = styled.h5`
  font-size: 28px;
  font-family: 'Gilroy-Bold';
`

export const ItemDescription = styled.p`
  font-size: 22px;
`