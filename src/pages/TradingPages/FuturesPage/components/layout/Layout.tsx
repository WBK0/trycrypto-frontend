import Navbar from "../../../../../layout/Navbar/Navbar";
import { ContainerFluid, Wrapper } from "./layout.style";

interface ILayout{
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return(
    <Wrapper>
      <Navbar />
      <ContainerFluid>
        {children}
      </ContainerFluid>
    </Wrapper>
   
  )
}

export default Layout;