import { Avatar, DetailsHeader, DetailsWrapper, DetailsContent, FlexWrapper, InfoWrapper, Nickname, Wrapper, EditButton, UserWrapper } from "./userInfo.styles";
import api from "../../../../services/api";
import { useEffect, useState } from "react";
import User from "./components/User";
import UserDetails from "./components/UserDetails";

// User info component - renders the user's info
const UserInfo = () => {
  // Creating a state for the user's info
  const [user, setUser] = useState({
    email: '',
    firstname: '',
    lastname: '',
    username: '',
    profilePicture: ''
  })

  // Function to fetch the user's info
  const fetchUser = async () => {
    const data = await api.get('/api/user/');
    setUser(data.data);
  }
  
  // Fetching the user's info on component mount
  useEffect(() => {
    fetchUser()
  }, [])

  return(
    <Wrapper>
      <User user={user} />
      <UserDetails user={user} />
    </Wrapper>
  )
}

export default UserInfo;