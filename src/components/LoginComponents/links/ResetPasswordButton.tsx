import { Row } from '../../../shared/row';
import { ResetPasswordLink } from './styles/resetButton.style';

const ResetPasswordButton = () => {
  return(
    <Row justifyContent='center' mt='20px'>
      <ResetPasswordLink to="/reset-password">Forgot your password?</ResetPasswordLink>
    </Row>
  )
}

export default ResetPasswordButton;