import Footer from "../../components/Footer/Footer";
import { Container } from "../../shared/container";
import Navbar from "../Navbar/Navbar";
import { Wrapper } from "./layout.style";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <Container>
          {children}
        </Container>
      </Wrapper>
      <Footer />
    </>
  )
}

export default Layout;