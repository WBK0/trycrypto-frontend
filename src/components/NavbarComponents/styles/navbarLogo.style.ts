import { Link } from "react-router-dom";
import styled from "styled-components";

export const LogoLink = styled(Link)`
  z-index: 1; 
  height: 100%; 
  background-color: var(--theme-dark);
  display: flex; 
  align-items: center;
`

export const Logo = styled.img`
  width: 200px;
  height: 40px;
`