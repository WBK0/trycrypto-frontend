import Navbar from "../Navbar/Navbar";
import styles from "./Layout.module.css"

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className={styles.layout}>
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;