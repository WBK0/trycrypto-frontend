import styles from './links.module.css';
import { SignupLink, SignupText, Wrapper } from './styles/signupArrow.styles';

const SignUpButton = () => {
  return(
    <Wrapper>
      <SignupLink to="/signup">
        <SignupText>Signup</SignupText>
        <i className="bi bi-arrow-right"></i>
      </SignupLink>
    </Wrapper>
  )
}

export default SignUpButton;