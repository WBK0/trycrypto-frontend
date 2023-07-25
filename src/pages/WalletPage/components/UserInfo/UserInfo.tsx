import { Avatar, DetailsHeader, DetailsWrapper, DetailsContent, FlexWrapper, InfoWrapper, Nickname, Wrapper, EditButton, UserWrapper } from "./userInfo.styles";
import avatar from './img/avatar.png'
import api from "../../../../services/api";
import { useEffect, useState } from "react";

const UserInfo = () => {
  const [user, setUser] = useState({
    email: '',
    firstname: '',
    lastname: '',
    username: ''
  })

  const fetchUser = async () => {
    const data = await api.get('/api/user/');
    setUser(data.data);
  }
  
  useEffect(() => {
    fetchUser()
  }, [])


  return(
    <Wrapper>
      <UserWrapper>
        <Avatar src={avatar} alt="user avatar"/>
        <Nickname>Anonymous user</Nickname>
        <EditButton to={'/profile'}>Edit profile</EditButton>
      </UserWrapper> 
      <InfoWrapper>
        <DetailsWrapper>
          <FlexWrapper>
          <DetailsHeader>
            Email
          </DetailsHeader>
          <DetailsContent>{user.email}</DetailsContent>
          </FlexWrapper>
        </DetailsWrapper>
        <DetailsWrapper>
          <FlexWrapper>
          <DetailsHeader>
            Username
          </DetailsHeader>
          <DetailsContent>{user.username}</DetailsContent>
          </FlexWrapper>
        </DetailsWrapper>
        <DetailsWrapper>
          <FlexWrapper>
          <DetailsHeader>
            Firstname
          </DetailsHeader>
          <DetailsContent>{user.firstname}</DetailsContent>
          </FlexWrapper>
        </DetailsWrapper>
        <DetailsWrapper>
          <FlexWrapper>
          <DetailsHeader>
            Lastname
          </DetailsHeader>
          <DetailsContent>{user.lastname}</DetailsContent>
          </FlexWrapper>
        </DetailsWrapper>
      </InfoWrapper>
    </Wrapper>
  )
}

export default UserInfo;