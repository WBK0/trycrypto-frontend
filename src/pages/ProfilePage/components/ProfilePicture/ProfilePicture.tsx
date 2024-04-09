import { useRef, useState } from "react";
import { Avatar, HiddenInput, ProfilePictureWrapper } from "../../profilePage.styles"
import ProfilePictureOverlay from "../Overlay/ProfilePictureOverlay"
import { toast } from "react-toastify";
import api from "../../../../services/api";
import { IUser } from "../../ProfilePage";

// Profile picture interface
interface IProfilePicture{
  user: IUser;
  fetchUser: () => void;
}

// The profile picture component - renders the user's profile picture
const ProfilePicture : React.FC<IProfilePicture> = ({ user, fetchUser}) => {
  // Initialising the state
  const [showOverlay, setShowOverlay] = useState(false);
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function handling the submit of the new profile picture
  const updateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // Getting the file and checking if it exists
      const file = e.target.files?.[0];

      if (!file) {
        return;
      }
      
      // Creating a form data object
      const formData = new FormData();
      formData.append("profilePicture", file);

      // Sending the request to the server to update the profile picture
      await api.patch("/api/user/profile/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Showing a success toast and fetching the user's info
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
    } catch (error : any) {
      // Showing an error toast if the request failed and logging the error
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

  // Function handling the click on the profile picture
  const handlePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return(
    <ProfilePictureWrapper
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
      onClick={handlePictureClick}
    >
      <Avatar src={user.profilePicture ? 'https://trycrypto.codebybartlomiej.pl/v1/uploads/' + user.profilePicture : 'https://trycrypto.codebybartlomiej.pl/v1/uploads/default.png'} alt="user avatar"/>
      <ProfilePictureOverlay show={showOverlay} />
      <HiddenInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={updateImage}
      />
    </ProfilePictureWrapper>
  )
}

export default ProfilePicture;