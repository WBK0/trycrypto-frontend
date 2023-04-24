import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinksContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 800px) {
    display: none;
  }
`

export const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 10px;
  margin-right: 10px;
  &:hover{
    transition: 0.3s;
    color: var(--font-yellow)
  }
`

export const ResponsiveContainer = styled.div`
  flex: 1;
  width: 100%;  
  display: flex;
  justify-content: end;
  @media screen and (min-width: 800.1px){
    display: none;
  }
`

export const ResponsiveButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 28px;
  z-index: 1;
  line-height: 30px;
`

export const NavbarLinkExtended = styled(Link)`
  color: white;
  text-decoration: none;
  position: relative;
  z-index: -2;
  font-size: 20px;
  width: 100%;
  margin: 6px;
  &:hover{
    transition: 0.3s;
    color: var(--font-yellow)
  }
`

export const NavbarExtendedContainer = styled.div`
  position: absolute;
  top: 60px;
  z-index: 0;
  background-color: var(--theme-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0;
  width: 100%;
  padding-left: 20px;
  padding-bottom: 20px;
  @keyframes slideIn {
  from {
    top: -50px;
  }
  to {
    top: 60px;
  }
}
  animation: slideIn 0.5s ease-in-out forwards;
`
