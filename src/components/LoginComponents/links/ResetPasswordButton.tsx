import { Row } from '../../../shared/row';
import { ResetPasswordLink } from './styles/resetButton.style';

const ResetPasswordButton = () => {
  return(
    <Row justifyContent='center' mt='20px'>
      <ResetPasswordLink to="/password/reset">Forgot your password?</ResetPasswordLink>
    </Row>
  )
}

export default ResetPasswordButton;