import { SignupLink, SignupText, Wrapper } from './loginArrow.styles';

// Sign up button component - renders a button that redirects to the sign up page
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