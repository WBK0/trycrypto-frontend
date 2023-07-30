import styled from "styled-components"

export const LoadingContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  background-color: black;
  opacity: 0.85;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

export const Loader = styled.div`
  border: 10px solid transparent;
  border-radius: 50%;
  border-top: 10px solid #ffffff;
  border-right: 10px solid #ffffff;
  border-bottom: 10px solid #ffffff;
  width: 80px;
  height: 80px;
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