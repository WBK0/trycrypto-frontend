import { Row } from '../../../../shared/row';
import { TextLink } from './loginText.style';

interface ILoginText{
  children: React.ReactNode;
}

const LoginText : React.FC<ILoginText> = ({ children }) => {
  return(
    <Row justifyContent='center' mt='20px'>
      <TextLink to="/login">{children}</TextLink>
    </Row>
  )
}

export default LoginText;