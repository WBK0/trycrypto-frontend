import styled from "styled-components";

export const Wrapper = styled.div`
  border-bottom: 10px solid var(--theme-dark);
  width: 100%;
  display: flex;
  justify-content: end;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-right: 5px;
  @media screen and (min-width: 1000px){
    border: 1px solid var(--border-dark);
  }
`

interface ISelectButton{
  active?: boolean;
}
export const SelectButton = styled.button<ISelectButton>`
  background-color: transparent;
  color: var(--font-yellow);
  color: ${props => props.active ? 'var(--font-yellow)' : 'var(--font-grey)'};
  outline: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  margin-left: 3px;
  margin-right: 3px;
`