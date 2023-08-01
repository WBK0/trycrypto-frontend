import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 250px;
`

export const Header = styled.h4`
  font-family: 'Gilroy-Bold';
  font-size: 30px;
`

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  margin-top: 40px;
`

export const ItemWrapper = styled.div`
  width: calc(20% - 20px);
  min-width: 200px;
  justify-content: center;
  min-height: 180px;
  border-radius: 15px;
  background-color: var(--theme-dark);
  padding: 22px;
  display: flex;
  flex-wrap: wrap;
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
`

export const ChangeText = styled.p`
  margin-bottom: 0px;
  margin-left: 8px;
`

export const ChangeIcon = styled.i`

`