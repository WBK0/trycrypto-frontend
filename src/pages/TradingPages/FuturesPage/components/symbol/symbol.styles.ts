import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  @media screen and (min-width: 1000px){
    border: 1px solid var(--border-dark);
    border-right: none;
  }
`