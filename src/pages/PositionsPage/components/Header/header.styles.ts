import styled from "styled-components";

export const Wrapper = styled.div`
  width: calc(100% - 20px);
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  border: solid rgb(66, 66, 66);
  border-width: 0px 0px 2px 0px;
  @media screen and (min-width: 800px){
    margin-left: 30px;
    width: calc(100% - 60px);
  }
`

export const Heading = styled.h1`
  color: white;
  font-size: 35px;
  line-height: 32px;
  margin-right: 35px;
  font-family: 'Gilroy-Medium';
`

export const Instrument = styled.h3`
  font-size: 16px;
  color: rgb(132, 142, 156);
  font-weight: 400;
  font-family: 'Gilroy-Bold';
`