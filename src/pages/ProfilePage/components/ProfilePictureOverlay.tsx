import { Overlay } from "./profilePictureOverlay.styles";

const ProfilePictureOverlay = ({ show }) => {
  return(
    <Overlay style={{ opacity: show ? 1 : 0 }}>
      <i className="bi bi-pencil-fill"></i>
    </Overlay>
  )
};

export default ProfilePictureOverlay;