import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`

export const Text = styled.span`
  font-size: 18px;
`

export const LoginLink = styled(Link)`
  text-decoration: none;
  color: var(--font-yellow);
  font-weight: 500;
  &:hover{
    color: var(--font-yellow);
  }
`