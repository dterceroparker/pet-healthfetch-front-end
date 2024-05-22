// npm modules
import { NavLink } from 'react-router-dom'

//assets
import logo from '../../assets/branding/logo.png'

//css
import styles from './NavBar.module.css'

const NavBar = ({ user, handleLogout }) => {
  const publicLinks = (
    <ul>
      <li>Hello, {user ? user.name : 'friend'}</li>
      <li><NavLink to="/auth/login">Log In</NavLink></li>
      <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
    </ul>
  )

  const protectedLinks = (
    <ul>
      <li>Hello, {user ? user.name : 'friend'}</li>
      <li><NavLink to="/profiles">Profiles</NavLink></li>
      <li><NavLink to="/pets">Pets</NavLink></li>
      <li><NavLink to="" onClick={handleLogout}>Log Out</NavLink></li>
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
