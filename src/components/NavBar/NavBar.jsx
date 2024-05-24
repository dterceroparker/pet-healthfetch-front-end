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
      <li><NavLink to="/auth/login">LOG IN</NavLink></li>
      <li><NavLink to="/auth/signup">SIGN UP</NavLink></li>
    </ul>
  )

  const protectedLinks = (
    <ul>
      <p>Hello, {user ? user.name : 'friend'}</p>
      <li><NavLink to="/profiles">PROFILES</NavLink></li>
      <li><NavLink to="/pets">PETS</NavLink></li>
      <li><NavLink to="/pets">NEW PET</NavLink></li>
      <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
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
