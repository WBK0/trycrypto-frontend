import { IUser } from "../../ProfilePage";
import { Input } from "../../profilePage.styles";

// Inputs interface
interface IInputs{
  firstname: string;
  lastname: string;
  username: string;
  setFirstname: (firstname: string) => void;
  setLastname: (lastname: string) => void;
  setUsername: (username: string) => void;
  editView: boolean;
  user: IUser;
}

// Inputs component - renders the inputs
const Inputs : React.FC<IInputs> = ({ firstname, lastname, username, setFirstname, setLastname, setUsername, editView, user }) => {

  // Function that masks the email address
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
      <Input value={firstname} disabled={!editView} editView={editView} onChange={(e) => setFirstname(e.target.value)}/>
      <Input value={lastname} disabled={!editView} editView={editView} onChange={(e) => setLastname(e.target.value)}/>
      <Input value={username} disabled={!editView} editView={editView} onChange={(e) => setUsername(e.target.value)}/>
      <Input value={user && maskEmail(user.email)} disabled/>
    </>
  )
}

export default Inputs;