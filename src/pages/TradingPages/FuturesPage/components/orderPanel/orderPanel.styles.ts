import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 810px;
  padding: 0px;
  background-color: #141921;
  border-bottom: 10px solid var(--theme-dark);
  @media screen and (min-width: 1000px) {
    height: 760px;
    border: 1px solid var(--border-dark);
    border-left: none;
  }
  display: flex;
  flex-wrap: wrap;
  color: white;
  flex-direction: column;
`

export const LeverageWrapper = styled.div`
  width: 100%;
  padding: 12px;
`

export const LeverageButton = styled.button`
  height: 30px;
  width: 100%;
  background-color: #283242;
  border: none;
  color: white;
  border-radius: 6px;
  &:hover{
    background-color: #1d2430;
  }
`

export const OrderTypeWrapper = styled.div`
  width: 100%;
`

interface IOrderTypeLink{
  active: boolean;
}

export const OrderTypeLink = styled.span<IOrderTypeLink>`
  padding-left: 12px;
  cursor: pointer;
  color: ${props => props.active ? 'var(--font-yellow)' : 'white'};
  font-weight: 500;
`