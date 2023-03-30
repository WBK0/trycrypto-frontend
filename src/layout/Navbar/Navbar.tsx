import logo from "../../assets/logo.png";
import styles from "./Navbar.module.css";
import {Link} from "react-router-dom";
import NavbarLayout from "../../components/NavbarComponents/NavbarLayout";
import NavbarLogo from "../../components/NavbarComponents/NavbarLogo";
import NavbarContent from './../../components/NavbarComponents/NavbarContent';
import NavbarUserActions from "../../components/NavbarComponents/NavbarUserActions";

const Navbar: React.FC = () => {
  return(
    <NavbarLayout>
      <NavbarLogo />
        <NavbarContent />
        <NavbarUserActions />
    </NavbarLayout>    
  )
}

export default Navbar;