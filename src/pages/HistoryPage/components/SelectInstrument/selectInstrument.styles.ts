import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 20px;
`

interface ISelectButton{
  active: boolean;
}

export const SelectButton = styled.button<ISelectButton>`
  border: none;
  background-color: ${props => props.active ? 'var(--theme-dark)' : 'var(--theme-primary)'};
  color: ${props => props.active ? 'var(--font-yellow)' : 'rgb(122,122,122)'};
  padding: 5px 30px 5px 30px;
  font-weight: 500;
  font-size: 15px;
  margin-right: 20px;
  border-radius: 6px;
  border: 2px solid transparent;
  &:hover{
    background-color: var(--theme-dark);
  }
`