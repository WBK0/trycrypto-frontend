import { Row } from '../../../../shared/row';
import { TextLink } from './loginText.style';

// LoginText interface
interface ILoginText{
  children: React.ReactNode;
}

// LoginText component - renders the redirect to login page text
const LoginText : React.FC<ILoginText> = ({ children }) => {
  return(
    <Row justifyContent='center' mt='20px'>
      <TextLink to="/login">{children}</TextLink>
    </Row>
  )
}

export default LoginText;