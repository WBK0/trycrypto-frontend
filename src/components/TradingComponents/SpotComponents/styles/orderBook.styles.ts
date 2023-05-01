import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 510px;
  padding: 0px;
  border-bottom: 10px solid var(--theme-dark);
  @media screen and (min-width: 1000px) {
    height: 500px;
    border: 1px solid var(--border-dark);
    border-top: none;
  }
`

export const SettingsBar = styled.div`
  height: 34px;
  display: flex;
  justify-content: right;
`

export const BookWrapper = styled.div`
  font-size: 24px;
  line-height: 34px;
  padding-right: 10px;
  color: ${props => props.color};
`

export const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  height: 25px;
`

export const AsksWrapper = styled.div`

`

export const BidsWrapper = styled.div`

`

export const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
  height: 40px;
`

interface IItem {
  background: string;
}

export const Item = styled.div<IItem>`
  color: white; 
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-between;
  height: 20px;
  font-size: 15px;
  line-height: 20px;
  background: ${props => props.background};
`