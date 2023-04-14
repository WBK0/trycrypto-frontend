interface Props{
  children: React.ReactNode
}

const NavbarLayout: React.FC<Props> = ({ children }) => {
  return(
    <nav className="navbar navbar-dark navbar-expand-lg navbar-color p-2 fixed-top" >
      <div className="container">
        {children}
      </div>
    </nav>
  )
}

export default NavbarLayout;