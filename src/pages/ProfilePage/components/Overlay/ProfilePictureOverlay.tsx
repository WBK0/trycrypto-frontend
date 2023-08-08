import { Overlay } from "./profilePictureOverlay.styles";

// ProfilePictureOverlay interface
interface IProfilePictureOverlay{
  show: boolean;
}

// ProfilePictureOverlay component - renders the profile picture overlay
const ProfilePictureOverlay : React.FC<IProfilePictureOverlay> = ({ show }) => {
  return(
    <Overlay style={{ opacity: show ? 1 : 0 }}>
      <i className="bi bi-pencil-fill"></i>
    </Overlay>
  )
};

export default ProfilePictureOverlay;