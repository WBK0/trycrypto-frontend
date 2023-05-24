import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  bottom: 5px;
  left: 5%;
  right: 5%;
  width: 90%;
  display: flex;
  justify-content: space-between;
`

export const Button = styled.button`
  width: 47.5%;
  background-color: ${props => props.color};
  color: white;
  border: none;
  padding: 5px 10px 5px 10px;
  border-radius: 4px;
  font-weight: 600;
`