import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--theme-dark);
  width: 100%;
  min-height: 500px;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ProfilePictureWrapper = styled.div`
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
`

export const Avatar = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin: 0 auto;
  @media screen and (min-width: 1000px){
    margin: 0; 
  }
`

export const Header = styled.h1`
  padding-bottom: 35px;
  font-size: 40px;
  padding-top: 10px;
  color: rgb(200, 200, 200);
`

interface IInput{
  editView?: boolean;
}

export const Input = styled.input<IInput>`
  margin-top: 15px;
  width: 100%;
  height: 40px;
  color: rgb(150, 150, 150);
  background-color: var(--theme-primary);
  font-weight: 500;
  border: ${props => props.editView ? '2px solid rgb(100, 100, 100)' : '2px solid transparent'};
  padding-left: 10px;
  font-size: 18px;
  @media screen and (min-width: 600px){
    width: 350px;
  }
  &:focus{
    outline: none;
    border: 2px solid rgb(180, 180, 180) !important;
  }
`

export const Button = styled.button`
  margin-top: 30px;
  border: none;
  background-color: ${props => props.color || 'var(--font-yellow)'};
  color: white;
  padding: 5px 25px 5px 25px;
  border-radius: 7px;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px;

  &:hover{
    background-color: var(--theme-primary);
  }
`

export const ResetPassword = styled(Link)`
  text-decoration: none;
`

export const ButtonsWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 50px; 
  @media screen and (max-width: 600px){
    display: flex;
    flex-direction: column;
  } 
`

export const HiddenInput = styled.input`
  display: none;
`;
