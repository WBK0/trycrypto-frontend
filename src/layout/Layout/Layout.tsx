import Footer from "../../components/Footer/Footer";
import { Container } from "../../shared/container";
import Navbar from "../Navbar/Navbar";
import { Wrapper } from "./layout.style";

// Layout interface
interface ILayout {
  children: React.ReactNode;
}

// Layout component
const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <Container>
          {children} {/* Rendering children components */}
        </Container>
      </Wrapper>
      <Footer />
    </>
  )
}

export default Layout;