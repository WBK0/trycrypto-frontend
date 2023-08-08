import { Button, ButtonsWrapper, ResetPassword } from "../../profilePage.styles";

// Buttons interface
interface IButtons{
  handleView: () => void;
  editView: boolean;
}

// Buttons component - renders the buttons
const Buttons : React.FC<IButtons> = ({handleView, editView}) => {
  return(
    <ButtonsWrapper>
      <ResetPassword to={'/password/reset'}>
        <Button>Reset Password</Button>
      </ResetPassword>
      <Button onClick={handleView} color={editView ? 'green' : ''}>{editView ? 'Save' : 'Edit'}</Button>
    </ButtonsWrapper>
  )
}

export default Buttons;