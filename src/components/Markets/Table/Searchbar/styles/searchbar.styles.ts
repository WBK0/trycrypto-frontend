import styled from "styled-components";

export const SearchInput = styled.input`
  margin-top: 15px;
  margin-bottom: 20px;
  outline: none;
  padding-left: 8px;
  width: 100%;
  height: 48px;
  background-color: transparent;
  color: white;
  border-radius: 4px;
  font-size: 19px;
  border: 2px solid rgb(122, 122, 122);
  &:focus{
    border: 2px solid var(--font-yellow);
  }
  &:hover{
    border: 2px solid var(--font-yellow);
  }
`