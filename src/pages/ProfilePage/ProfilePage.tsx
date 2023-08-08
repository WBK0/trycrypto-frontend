import { useEffect, useState } from "react";
import Layout from "../../layout/Layout/Layout";
import api from "../../services/api";
import { Button, ButtonsWrapper, Header, ResetPassword, Wrapper } from "./profilePage.styles";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import Inputs from "./components/Inputs/Inputs";
import ProfilePicture from "./components/ProfilePicture/ProfilePicture";
import Buttons from "./components/Buttons/Buttons";

// Interface for the user object
export interface IUser{
  profilePicture: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}

// ProfilePage component - renders the profile page
const ProfilePage = () => {
  // Initialising the states
  const [user, setUser] = useState<IUser>({
    firstname: '',
    lastname: '',
    username: '',
    profilePicture: '',
    email: ''
  });
  const [editView, setEditView] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true);

  // Function that handles the edit/save button
  const handleView = () => {
    if(editView){
      updateUser();
    }
    setEditView(!editView)
  }

  // Function that updates the user's profile
  const updateUser = async () => {
    try {
      // Sending the request to the server
      await api.patch('/api/user/profile/update', {
        firstname: firstname,
        lastname: lastname,
        username: username
      })
      // Displaying a success toast
      toast.success(`User profile updated successfully`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      // Displaying an error toast if the request failed and logging the error
      console.log(error)
      toast.error(`Failed to update user profile`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }

  // Function that fetches the user's profile
  const fetchUser = async () => {
    const data = await api.get('/api/user/');
    setUser(data.data);
    setFirstname(data.data.firstname);
    setLastname(data.data.lastname);
    setUsername(data.data.username);
    setTimeout(() => {
      setLoading(false);
    }, 200)
  }
  
  // Fetching the user's profile on component mount
  useEffect(() => {
    fetchUser()
  }, [])

  return(
  <>
    {loading 
      ? <Loading />
      : null
    }
    <Layout>
      <Wrapper>
        <Header>Your profile</Header>
        <ProfilePicture 
          user={user}
          fetchUser={fetchUser}  
        />
        <Inputs 
          firstname={firstname}
          lastname={lastname}
          username={username}
          setFirstname={setFirstname}
          setLastname={setLastname}
          setUsername={setUsername}
          editView={editView}
          user={user}
        />
        <Buttons 
          editView={editView}
          handleView={handleView}
        />
      </Wrapper>
    </Layout>
  </>
  )
}

export default ProfilePage;