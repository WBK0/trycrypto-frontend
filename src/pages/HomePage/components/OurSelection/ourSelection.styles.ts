import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 100px;
  @media screen and (min-width: 800px){
    margin-top: 550px;
  }
`

export const Header = styled.h4`
  font-family: 'Gilroy-Heavy';
  font-size: 30px;
`

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  margin-top: 40px;
`

export const ItemWrapper = styled(Link)`
  text-decoration: none;
  width: 100%;
  justify-content: center;
  min-height: 180px;
  border-radius: 15px;
  background-color: var(--theme-dark);
  padding: 22px;
  display: flex;
  flex-wrap: wrap;
  &:hover{
    background-color: rgb(20, 20, 20);
  }
  @media screen and (min-width: 600px){
    width: calc(50% - 10px);
  }
  /* @media screen and (min-width: 800px) {
    width: calc(33% - 10px);
    min-width: 200px;
  } */
  @media screen and (min-width: 1110px){
    min-width: 200px;
    width: calc(20% - 20px);
  }
`

export const Icon = styled.img`
  width: 48px;
  height: 48px;
`

export const CryptoName = styled.h6`
  line-height: 48px;
  margin-left: 10px;
  color: rgb(200,200,200);
  font-size: 22px;
  font-family: 'Gilroy-Bold';
`

export const Price = styled.p`
  width: 100%;
  font-size: 19px;
  font-family: 'Gilroy-Medium';
  margin-top: 7px;
  text-align: center;
  color: rgb(220, 220, 220);
`

interface IChange{
  isGrowing : boolean
}

export const Change = styled.div<IChange>`
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 20px;
  border-radius: 25px;
  background-color: ${props => props.isGrowing ? '#3f8f00' : '#8f041b' };
  justify-content: center;
  margin: 0 auto;
  margin-top: 15px;
  color: white;
`

export const ChangeText = styled.p`
  margin-bottom: 0px;
  margin-left: 8px;
`

export const ChangeIcon = styled.i`

`