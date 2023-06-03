import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--theme-dark);
  width: 100%;
  min-height: 150px;
  border-radius: 12px;
  padding: 15px;
`

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`

export const Nickname = styled.span`
  padding-left: 20px;
  font-size: 22px;
  
`

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

`

export const InfoWrapper = styled.div`
  padding-left: 100px;
`

export const DetailsWrapper = styled.div`
  display: inline-block;
  padding: 0px 35px 0px 35px;
`

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const DetailsHeader = styled.span`
  color: rgb(100,100,100);
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
`

export const DetailsContent = styled.span`
  font-size: 18px;
`

export const EditButton = styled(Link)`
  margin-left: auto;
  background-color: var(--font-yellow);
  color: white;
  text-decoration: none;
  padding: 8px 15px 8px 15px;
  border-radius: 7px;
  font-weight: 500;
  margin-right: 10px;
  &:hover{
    background-color: var(--theme-dark);
    color: var(--font-yellow);
  }
`