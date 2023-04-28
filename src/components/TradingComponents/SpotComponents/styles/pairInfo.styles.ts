import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px solid rgb(90, 90, 90);
  min-height: 66px;
  border-top: none;
  color: white;
  width: 100%;
  @media screen and (min-width: 1000px){
    
    border-left: none;
  }
`

export const Title = styled.p`
  font-size: 13px;
  color: rgb(76, 76, 76);
  font-weight: 500;
  margin-bottom: 0;
  width: 100%;
  text-align: center;
`

export const Info = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0px;
  width: 100%;
  text-align: center;
`