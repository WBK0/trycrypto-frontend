import styled from "styled-components";

export const Status = styled.td`
  min-width: ${props => props.width};
  text-align: center;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: ${props => props.color == 'filled' && 'rgb(11, 181, 11)' || props.color == 'active' && 'rgb(130, 130, 130)' || props.color == 'canceled' && 'rgb(182, 34, 22)'};
  min-width: ${props => props.width};
  font-size: 20px;
 
`