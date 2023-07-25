import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface IActionsContainer {
  extended?: boolean;
}

export const ActionsContainer = styled.div<IActionsContainer>`
  display: flex;
  width: 200px;
  justify-content: end;
  font-size: 25px;
  @media screen and (max-width: 800px) {
    ${({ extended }) =>
    extended ? css`
      margin-top: 5px;
      width: 100%;
      justify-content: start;
    `
    : css`
        display: none;
      `
    } 
  }
`

export const LogoutButton = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  &:hover{
    transition: 0.3s;
    color: var(--font-yellow);
  }
`

export const LoginButton = styled.button`
  font-size: 15px;
  border-radius: 20px;
  font-weight: 500;
  height: 30px;
  background-color: #141921;
  color: white;
  border: none;
  margin: auto 0;
  padding-left: 15px;
  padding-right: 15px;
  &:hover{
    background-color: rgb(226, 226, 226);
    color: black;
  }
`

export const LoginLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`

export const ProfileButton = styled.button`
  text-decoration: none;
  border: none;
  background-color: transparent;
  color: white;
  &:hover{
    transition: 0.3s;
    color: var(--font-yellow);
  }
`