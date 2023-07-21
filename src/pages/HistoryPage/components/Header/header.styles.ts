import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 10px;
`

export const Heading = styled.h1`
  text-transform: uppercase;
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 25px;
`

interface IButton{
  active: boolean;
}

// export const Link = styled(Link)`
// `

export const Button = styled.button<IButton>`
  background-color: ${props => props.active ? 'var(--theme-dark)' : 'transparent'};
  color: ${props => props.active ? 'var(--font-yellow)' : 'rgb(122, 122, 122)'};
  font-weight: 600;
  border: none;
  padding: 10px 30px 10px 30px;
  font-size: 19px;
  border-radius: 7px;
  margin-right: 20px;
  text-decoration: none;
  &:hover{
    background-color: var(--theme-dark);
    color: ${props => props.active ? 'var(--font-yellow)' : 'rgb(122, 122, 122)'};
  }
`

export const Hr = styled.div`
  margin-top: 20px;
  margin-bottom: 0px;
  width: 100%;
  background-color: #2a2a2a;
  height: 2px;
`