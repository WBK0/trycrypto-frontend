import { useEffect, useRef, useState } from "react";
import Layout from "../../layout/Layout/Layout";
import api from "../../services/api";
import avatar from './img/avatar.png'
import { Avatar, Button, ButtonsWrapper, Header, HiddenInput, Input, ProfilePicture, ResetPassword, Wrapper } from "./profilePage.styles";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import ProfilePictureOverlay from "./components/ProfilePictureOverlay";

interface IUser{
  profilePicture: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}

const ProfilePage = () => {
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
  const [showOverlay, setShowOverlay] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleView = () => {
    if(editView){
      updateUser();
    }
    setEditView(!editView)
  }

  const updateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];

      if (!file) {
        return;
      }
      
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await api.patch("/api/user/profile/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Avatar updated successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      fetchUser();
      console.log(response)
    } catch (error : any) {
      let message;
      console.log(error.response.data.error_code)
      if(error.response.data.error_code == 111){
        message = 'Avatar must be .jpg or .png file'
      }else if(error.response.data.error_code == 112){
        message = 'Avatar must be 128x128 px'
      }else{
        message = 'Failed to update avatar'
      }
      toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      console.log(error)
    }
    
  }

  const updateUser = async () => {
    try {
      const response = await api.patch('/api/user/profile/update', {
        firstname: firstname,
        lastname: lastname,
        username: username
      })
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
  
  useEffect(() => {
    fetchUser()
  }, [])

  function maskEmail(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex <= 0) {
      return email;
    }
  
    const maskedPart = email.substring(0, Math.floor((atIndex - 1) / 2)) + '*'.repeat(Math.ceil((email.length - atIndex) / 2));
    return maskedPart + email.substring(atIndex);
  }

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
          onMouseEnter={() => setShowOverlay(true)}
          onMouseLeave={() => setShowOverlay(false)}
          onClick={handlePictureClick}
        >
          <Avatar src={user.profilePicture ? 'https://api.trycrypto.pl/uploads/' + user.profilePicture : 'https://api.trycrypto.pl/uploads/default.png'} alt="user avatar"/>
          <ProfilePictureOverlay show={showOverlay} />
          <HiddenInput
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={updateImage}
          />
        </ProfilePicture>
        <Input value={firstname} disabled={!editView} editView={editView} onChange={(e) => setFirstname(e.target.value)}/>
        <Input value={lastname} disabled={!editView} editView={editView} onChange={(e) => setLastname(e.target.value)}/>
        <Input value={username} disabled={!editView} editView={editView} onChange={(e) => setUsername(e.target.value)}/>
        <Input value={user && maskEmail(user.email)} disabled/>
        <ButtonsWrapper>
          <ResetPassword to={'/password/reset'}>
            <Button>Reset Password</Button>
          </ResetPassword>
          <Button onClick={handleView} color={editView ? 'green' : ''}>{editView ? 'Save' : 'Edit'}</Button>
        </ButtonsWrapper>
      </Wrapper>
    </Layout>
  </>
  )
}

export default ProfilePage;