import { Avatar, EditButton, Nickname, UserWrapper } from "../userInfo.styles";

// User interface
interface IUser{
  user: {
    profilePicture: string,
    username: string
  }
}

// User component - renders the user's info
const User: React.FC<IUser> = ({ user }) => {
  return(
    <UserWrapper>
      <Avatar src={`https://trycrypto.codebybartlomiej.pl/v1/uploads/${user.profilePicture || 'default.png'}`} alt="user avatar"/>
      <Nickname>{user.username}</Nickname>
      <EditButton to={'/profile'}>Edit profile</EditButton>
    </UserWrapper>
  )
}

export default User;