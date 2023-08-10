import Navbar from "../../../../../layout/Navbar/Navbar";
import { ContainerFluid, Wrapper } from "./layout.style";

// Layout interface
interface ILayout{
  children: React.ReactNode;
}

// Layout component - renders the layout
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