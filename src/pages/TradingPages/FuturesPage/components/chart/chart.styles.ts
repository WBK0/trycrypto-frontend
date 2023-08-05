import styled from "styled-components";

export const ChartWrapper = styled.div`
  width: 100%;
  height: 700px;
  border-bottom: 10px solid var(--theme-dark);
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-bottom: 32px;
  background-color: #161A25;
  @media screen and (min-width: 1000px){
    border: 1px solid var(--border-dark);
    border-top: none;
    border-left: none;
    height: 596px;
  }
  @media screen and (min-width: 1400px){
    height: 700px;
  }
`