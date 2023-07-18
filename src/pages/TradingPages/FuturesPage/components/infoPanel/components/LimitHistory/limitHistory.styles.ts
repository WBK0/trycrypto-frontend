import styled from "styled-components";

export const Status = styled.td`
  font-size: 19px;
  padding-left: 10px;
  color: ${props => props.color == 'filled' && 'rgb(11, 181, 11)' || props.color == 'active' && 'rgb(130, 130, 130)' || props.color == 'canceled' && 'rgb(182, 34, 22)'};
`

export const StatusTh = styled.th`
  text-align: center;
  padding-right: 20px;
`