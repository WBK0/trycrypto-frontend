import { DetailsContent, DetailsHeader, DetailsWrapper, FlexWrapper, InfoWrapper } from "../userInfo.styles";

// UserDetails interface
interface IUserDetails{
  user: {
    email: string;
    username: string;
    firstname: string;
    lastname: string;
  }
}

// The UserDetails component - renders the user's details
const UserDetails : React.FC<IUserDetails> = ({ user }) => {
  return (  
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
  )
}

export default UserDetails;