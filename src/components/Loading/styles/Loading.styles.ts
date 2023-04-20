import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--theme-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

export const Loader = styled.div`
  border: 5px solid transparent;
  border-radius: 50%;
  border-top: 5px solid #ffffff;
  border-right: 5px solid #ffffff;
  border-bottom: 5px solid #ffffff;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 0.7s linear infinite;
  animation: spin 0.7s linear infinite;
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`