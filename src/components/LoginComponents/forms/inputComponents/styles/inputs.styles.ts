import { Field } from "formik";
import styled, { css } from "styled-components";

export const Label = styled.label`
  margin-bottom: 6px;
  color: #606469 !important;
  font-family: 'Poppins', sans-serif !important;
`

export const InvalidMessage = styled.div`
  color: #dc3545;
  margin-top: 5px;
  margin-left: 3px;
  font-size: 0.9rem;
`

export const Input = styled(Field)`
  width: 100%;
  height: 45px;
  background-color: #1F2329;
  border: 2px solid #1B1F25;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-size: 20px;
  padding-left: 10px;
  color: white;
  &:focus{
    box-shadow: 0 0 0 0.15rem rgb(166, 166, 166);
    outline: none;
  }
  ${({ error }) =>
    error &&
    css`
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right calc(0.375em + 0.1875rem) center;
      background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    `}
    
  
`