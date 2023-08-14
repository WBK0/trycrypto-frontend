import Layout from "../../layout/Layout/Layout";
import logo from '../../assets/logo.png';
import { BackButton, Description, Flex, Header, Logo, Wrapper } from "./notFoundPage.styles";

// NotFoundPage component - renders the 404 page
const NotFoundPage = () => {
  return(
    <Layout>
      <Wrapper>
        <Flex>
          <Logo src={logo}></Logo>
          <Header>404 PAGE NOT FOUND</Header>
          <Description>We're sorry, but the page you're looking for could not be found. It seems that the provided URL may have a typo, or the page you're searching for has been moved, deleted, or is temporarily unavailable.</Description>
          <BackButton to={'/'}>Back to home</BackButton>
        </Flex>
      </Wrapper>
    </Layout>
  )
}

export default NotFoundPage;