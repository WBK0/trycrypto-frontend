import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  padding-left: 12px;
  padding-right: 12px;
  color: white;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  @media screen and (min-width: 1000px){
    border: 1px solid var(--border-dark);
    /* border-right: none; */
  }
`

export const Price = styled.span`
  text-align: center;
  font-size: 22px;
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding-left: 12px;
`

export const InfoHeader = styled.span`
  width: 100%;
  font-size: 14px;
  text-align: center;
`

export const InfoData = styled.span`
  width: 100%;
  font-size: 12px;
  text-align: center;
`