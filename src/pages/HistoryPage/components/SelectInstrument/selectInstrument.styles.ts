import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 20px;
`

interface ISelectButton{
  active: boolean;
}

export const SelectButton = styled.button<ISelectButton>`
  border: none;
  background-color: ${props => props.active ? 'var(--font-yellow)' : 'var(--theme-primary)'};
  color: white;
  padding: 5px 15px 5px 15px;
  font-weight: 500;
  font-size: 15px;
  margin-right: 20px;
  border-radius: 6px;
  border: 2px solid transparent;
  &:hover{
    background-color: transparent;
    border-color: var(--font-grey);
  }
`