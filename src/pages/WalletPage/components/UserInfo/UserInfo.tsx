import { Avatar, AvatarWrapper, DetailsHeader, DetailsWrapper, DetailsContent, FlexWrapper, InfoWrapper, Nickname, Wrapper, EditButton } from "./userInfo.styles";
import avatar from './img/avatar.png'

const UserInfo = () => {
  return(
    <Wrapper>
      <AvatarWrapper>
        <Avatar src={avatar} alt="user avatar"/>
        <Nickname>Anonymous user</Nickname>
        <EditButton to={'/profile'}>Edit profile</EditButton>
      </AvatarWrapper> 
      <InfoWrapper>
        <DetailsWrapper>
          <FlexWrapper>
          <DetailsHeader>
            Email
          </DetailsHeader>
          <DetailsContent>test@test.pl</DetailsContent>
          </FlexWrapper>
        </DetailsWrapper>
        <DetailsWrapper>
          <FlexWrapper>
          <DetailsHeader>
            Firstname
          </DetailsHeader>
          <DetailsContent>Joseph</DetailsContent>
          </FlexWrapper>
        </DetailsWrapper>
        <DetailsWrapper>
          <FlexWrapper>
          <DetailsHeader>
            Lastname
          </DetailsHeader>
          <DetailsContent>Kowalski</DetailsContent>
          </FlexWrapper>
        </DetailsWrapper>
      </InfoWrapper>
    </Wrapper>
  )
}

export default UserInfo;