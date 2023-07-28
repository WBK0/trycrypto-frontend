import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: rgb(96, 100, 105);
  font-family: Poppins, sans-serif;
  margin-top: 20px;
  &:hover{
    color: rgb(166, 166, 166);
  }
`

export const Icon = styled.i`
  font-size: 32px;
  margin-right: 0px;
  line-height: 30px;
`

export const Text = styled.div`
  line-height: 30px;
`