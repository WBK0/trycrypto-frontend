import logo from "../../assets/logo.png";
import styles from "./Navbar.module.css";
import {Link} from "react-router-dom";

const Navbar: React.FC = () => {
  return(
    <nav className="navbar navbar-dark navbar-expand-lg navbar-color p-2 fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} width="200" height="40"></img>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">
            
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link mx-2 text-light" aria-current="page" to="/sa">Rynki</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-2 text-light" aria-current="page" to="/das">Portfel</Link>
            </li>
          </ul>
        </div>
        <div className={styles.rightSide}>
          <i className="bi bi-person"></i>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;