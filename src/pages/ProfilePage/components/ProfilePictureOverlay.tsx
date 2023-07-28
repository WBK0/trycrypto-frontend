import { Overlay } from "./profilePictureOverlay.styles";

interface IProfilePictureOverlay{
  show: boolean;
}

const ProfilePictureOverlay : React.FC<IProfilePictureOverlay> = ({ show }) => {
  return(
    <Overlay style={{ opacity: show ? 1 : 0 }}>
      <i className="bi bi-pencil-fill"></i>
    </Overlay>
  )
};

export default ProfilePictureOverlay;