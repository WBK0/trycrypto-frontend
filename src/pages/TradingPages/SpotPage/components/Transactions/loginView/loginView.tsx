import { LoginLink, Text, Wrapper } from "./loginView.styles";

// LoginView component - renders the login view
const LoginView = () => {
  return(
    <Wrapper>
      <Text>
        <LoginLink to='/login'>Login</LoginLink> or <LoginLink to='/register'>Register</LoginLink> to access all features
      </Text>
    </Wrapper>
  )
}

export default LoginView;