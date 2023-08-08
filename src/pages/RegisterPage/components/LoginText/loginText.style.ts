import styled from "styled-components";
import { Link } from 'react-router-dom';

export const TextLink = styled(Link)`
  color: #606469;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  text-align: center;
&:hover{
  color: rgb(166, 166, 166);
}
`