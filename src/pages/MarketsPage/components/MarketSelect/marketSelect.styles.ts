import styled from "styled-components";

interface ISelectButton{
  active: boolean;
}

export const SelectButton = styled.button<ISelectButton>`
  padding-left: 15px;
  padding-right: 15px;
  height: 38px;
  border-radius: 6px;
  border: none;
  background-color: ${props => props.active ? 'var(--theme-dark)' : 'transparent'};
  color: ${props => props.active ? 'var(--font-yellow)' : 'rgb(122, 122, 122)'};
  font-weight: 500;
  margin-right: 10px;
  &:hover{
    background-color: var(--theme-dark);
  }
`