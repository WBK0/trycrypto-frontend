import { SignupLink, SignupText, Wrapper } from './styles/loginArrow.styles';

const SignUpButton = () => {
  return(
    <Wrapper>
      <SignupLink to="/signup">
        <SignupText>Register</SignupText>
        <i className="bi bi-arrow-right"></i>
      </SignupLink>
    </Wrapper>
  )
}

export default SignUpButton;