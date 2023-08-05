import styled from "styled-components";

export const Wrapper = styled.div`
  border-bottom: 10px solid var(--theme-dark);
  min-height: 66px;
  color: white;
  width: 100%;
  @media screen and (min-width: 1000px){
    border: 1px solid var(--border-dark);
    border-top: none;
    border-left: none;
  }
`

export const Title = styled.p`
  font-size: 12px;
  color: rgb(76, 76, 76);
  font-weight: 500;
  margin-bottom: 0;
  width: 100%;
  text-align: center;
  @media screen and (min-width: 600px){
    font-size: 13px;
  }
`

export const Info = styled.p`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 0px;
  width: 100%;
  text-align: center;
  @media screen and (min-width: 600px){
    font-size: 14px;
  }
`