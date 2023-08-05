import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 15px;
  margin-bottom: 15px;
`

interface IPaginationButton{
  isActive: boolean;
}

export const PaginationButton = styled.button<IPaginationButton>`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: ${props => props.isActive ? 'rgb(90, 90, 90)' : 'transparent'} !important;
  border: none;
  color: white;
  &:hover{
    background-color: rgb(90, 90, 90); 
    color: white;
  }
  @media (hover: none){
    &:hover{
      background-color: transparent;
    }
  }
  &:focus{
    box-shadow: none;
  }
`

export const DotsParagraph = styled.p`
  padding-left: 6px;
  padding-right: 6px;
  margin-bottom: 5px;
  display: flex;
  align-items: end;
`