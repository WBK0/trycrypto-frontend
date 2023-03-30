import { Link } from 'react-router-dom';

const NavbarContent = () => {
  return(
    <>
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
    </>
  )
}

export default NavbarContent;
