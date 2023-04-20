import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
  font-size: 50px;
  @media (max-width: 599px) { 
    top: 0px;
    right: 15px;
  }
`

export const SignupLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: rgb(166, 166, 166);
  &:hover{
    color: rgb(212, 212, 212);
  }
`

export const SignupText = styled.span`
  font-size: 20px;
  margin-right: 10px;
`