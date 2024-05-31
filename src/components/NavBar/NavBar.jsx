// npm modules
import { NavLink } from 'react-router-dom'

//assets
import logo from '../../assets/branding/logo.png'

//css
import styles from './NavBar.module.css'

const NavBar = ({ user, handleLogout }) => {
  const publicLinks = (
    <ul>
      <p>Hello, {user ? user.name : 'friend'}</p>
      <li><NavLink to="/auth/login"><i className="fas fa-2x fa-duotone fa-right-to-bracket" id={styles.login}></i></NavLink></li>
      <li><NavLink to="/auth/signup"><i className="fas fa-2x fa-solid fa-id-card"></i></NavLink></li>
    </ul>
  )

  const protectedLinks = (
    <ul>
      <p>Hello, {user ? user.name : 'friend'}</p>
      <li><NavLink to="/profiles"><i className="fas fa-solid fa-user"></i></NavLink></li>
      <li><NavLink to="/pets"><i className="fa-solid fa-dog"></i> <i className="fa-solid fa-cat"></i></NavLink></li>
      <li><NavLink to="/pets/new"><i className="fa-solid fa-file-pen"></i></NavLink></li>
      <li><NavLink to="/auth/logout" onClick={handleLogout}><i className='fas fa-solid fa-door-open fa-2x'></i></NavLink> </li>
    </ul>
)

  return (
    <nav className={styles.container}>
      <NavLink className='logo' to='/'><img src={logo} alt="A cute pet" /></NavLink>
      {user ? protectedLinks : publicLinks}
    </nav>
  )
}

export default NavBar
