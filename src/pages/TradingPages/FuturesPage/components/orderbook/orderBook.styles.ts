import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 510px;
  padding: 0px;
  border-bottom: 10px solid var(--theme-dark);
  @media screen and (min-width: 1000px) {
    height: 475px;
    border: 1px solid var(--border-dark);
    border-left: none;
  }
`

export const SettingsBar = styled.div`
  height: 34px;
  display: flex;
  justify-content: space-between;
`

export const Select = styled.select`
  border: none;
  background-color: transparent;
  color: white;
  margin-left: 10px;
  outline: none;
`

export const Option = styled.option`
  background-color: var(--theme-primary);
  border: none;
  outline: none;  
`

export const Books = styled.div`
  display: flex;
  justify-content: right;
  margin-left: 3px;
`

export const BookWrapper = styled.div`
  font-size: 24px;
  line-height: 34px;
  padding-right: 10px;
  cursor: pointer;
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
  display: flex;  
  flex-direction: column-reverse;
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
  height: 39px;
`

interface IItem {
  background?: string;
}

export const Item = styled.div.attrs(({color}) => ({
  style: {
    background: color
  }
}))`
  color: white; 
  display: flex;
  padding-left: 5px;
  padding-right: 5px;
  justify-content: space-between;
  height: 20px;
  font-size: 15px;
  line-height: 20px;
`