import styled from "styled-components";

export const Wrapper = styled.div`
  border-bottom: 10px solid var(--theme-dark);
  height: 66px; 
  color: white;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 1000px){
    border: 1px solid var(--border-dark);
    border-top: none;
  }

`