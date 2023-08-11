import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  margin-top: 30px;
`

export const HelloHeader = styled.h4`
    font-family: 'Poppins', sans-serif;
`

export const EmailHeader = styled.h5`
  margin-bottom: 20px;
`
import { Field } from "formik";

export const Label = styled.label`
  margin-bottom: 6px;
  color: #606469;
  font-family: 'Poppins', sans-serif;
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
  outline: none;
  color: white;
  &:focus{
    box-shadow: 0 0 0 0.15rem rgb(166, 166, 166);
    outline: none;
  }
  ${({ error }) =>
    error == 'true' &&
    css`
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right calc(0.375em + 0.1875rem) center;
      background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    `}
`

export const LoginButton = styled.button`
  background-color: #ecbe04;
  color: white;
  width: 100%;
  margin-top: 30px;
  outline: none;
  border: none;
  font-family: 'Poppins', sans-serif;
  border-radius: 8px;
  height: 45px;
`

export const InputSpinner = styled.span`
  border: 4px solid white;
  border-right-color: transparent;
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  border-radius: 50%;
  animation: 0.75s linear infinite spinner-border;
`

export const ButtonText = styled.span`
  font-size: 20px;
  font-weight: 500;
`