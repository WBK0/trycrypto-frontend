import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 60px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 7px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  border-bottom: 10px solid var(--theme-dark);
  @media screen and (min-width: 1000px){
    border: 1px solid var(--border-dark);
    /* border-right: none; */
  }
`

export const Price = styled.span`
  text-align: center;
  color: ${props => props.color};
  font-size: 16px;
  line-height: 2em;
  @media screen and (min-width: 450px){
    font-size: 18px;
    line-height: 36px;
  }
  @media screen and (min-width: 800px){
    font-size: 22px;
  }
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding-left: 12px;
  height: 2em;
  @media screen and (min-width: 450px){
    height: 2.4em
  }
`

export const InfoHeader = styled.span`
  width: 100%;
  font-size: 12px;
  text-align: center;
  @media screen and (min-width: 450px){
    font-size: 13px;
  }
  @media screen and (min-width: 800px){
    font-size: 14px;
  }
`

export const InfoData = styled.span`
  width: 100%;
  font-size: 10px;
  text-align: center;
  color: ${props => props.color || 'white'};
  @media screen and (min-width: 450px){
    font-size: 11px;
  }
  @media screen and (min-width: 800px){
    font-size: 12px;
  }
`