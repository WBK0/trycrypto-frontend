import styled from "styled-components";

export const Wrapper = styled.div`
  /* border-bottom: 0px solid var(--theme-dark); */
  width: 100%;
  display: flex;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 5px;
  overflow-x: scroll;
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
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  margin-left: 3px;
  margin-right: 3px;
`