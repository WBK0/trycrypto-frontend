import { SignupLink, SignupText, Wrapper } from './loginArrow.styles';

// LoginArrow component - renders the redirect to login page arrow
const LoginArrow = () => {
  return(
    <Wrapper>
      <SignupLink to="/login">
        <SignupText>Login</SignupText>
        <i className="bi bi-arrow-right"></i>
      </SignupLink>
    </Wrapper>
  )
}

export default LoginArrow;