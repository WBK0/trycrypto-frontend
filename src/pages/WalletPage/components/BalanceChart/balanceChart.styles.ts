import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  background-color: var(--theme-dark);
  border-radius: 0px 0px 12px 12px;
  padding-bottom: 12px;
`

export const SelectInterval = styled.div`
  margin-left: calc(7.5% - 12px);
  padding-top: 10px;
`

interface ISelectButton {
  active: boolean;
}

export const SelectButton= styled.button<ISelectButton> `
  padding: 4px 10px 4px 10px;
  border-radius: 6px;
  margin-left: 12px;
  background-color: ${props => props.active ? 'var(--font-yellow)' : 'rgb(150, 150, 150)'};
  color: white;
  font-weight: 500;
  border: none;
`