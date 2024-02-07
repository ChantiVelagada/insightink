import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

function Navbar({isLoggedIn}) {
  return (
    <>
        <nav className={styles.navbar}>
          <Link to='/'><div className={styles.logo}>InsightInk</div></Link>
          <ul className={styles.nav_list}>
              {isLoggedIn ? 
              (<li><Link to='/newpost'>Create Post</Link></li>) : null}
              <li><Link to='/login'>{isLoggedIn ? 'Settings' : "Login"}</Link></li>
          </ul>
        </nav>
    </>
  )
}

export default Navbar