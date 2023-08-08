import { Row } from '../../../../shared/row';
import { ResetPasswordLink } from './resetButton.styles';

// Reset password button component - renders a button that redirects to the reset password page
const ResetPasswordButton = () => {
  return(
    <Row justifyContent='center' mt='20px'>
      <ResetPasswordLink to="/password/reset">Forgot your password?</ResetPasswordLink>
    </Row>
  )
}

export default ResetPasswordButton;