import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  
  margin-bottom: 100px;
  @media screen and (min-width: 1000px){
    border: 1px solid var(--border-dark);
  }
`

export const HeadingSelect = styled.div`
  display: flex;
  padding-top: 12px;
  padding-left: 12px;
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
  margin-right: 15px;
  cursor: pointer;
`