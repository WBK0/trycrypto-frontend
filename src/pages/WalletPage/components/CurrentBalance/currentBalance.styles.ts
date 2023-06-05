import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--theme-dark);
  color: white;
  min-height: 120px;
  width: 100%;
  margin-top: 25px;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  align-items: center;
`

export const BalanceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const HeaderBalance = styled.span`
  width: 100%;
  color: rgb(100,100,100);
  text-transform: uppercase;
  font-weight: 700;
  font-size: 22px;
  text-align: center;
`

export const ContentBalance = styled.span`
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
`