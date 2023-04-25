import NavbarLayout from "../../components/NavbarComponents/NavbarLayout";
import NavbarLogo from "../../components/NavbarComponents/NavbarLogo";
import NavbarContent from './../../components/NavbarComponents/NavbarContent';

const Navbar: React.FC = () => {
  return(
    <NavbarLayout>
      <NavbarLogo/>
      <NavbarContent />
    </NavbarLayout>    
  )
}

export default Navbar;