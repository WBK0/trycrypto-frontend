import { Avatar, EditButton, Nickname, UserWrapper } from "../userInfo.styles";

// User interface
interface IUser{
  user: {
    profilePicture: string;
  }
}

// User component - renders the user's info
const User: React.FC<IUser> = ({ user }) => {
  return(
    <UserWrapper>
      <Avatar src={`https://api.trycrypto.pl/uploads/${user.profilePicture}`} alt="user avatar"/>
      <Nickname>Anonymous user</Nickname>
      <EditButton to={'/profile'}>Edit profile</EditButton>
    </UserWrapper>
  )
}

export default User;