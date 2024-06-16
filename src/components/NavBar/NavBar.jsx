import { NavLink } from 'react-router-dom'
import logo from '../../assets/branding/logo.png'
import styles from './NavBar.module.css'

const NavBar = ({ user, handleLogout }) => {
  const publicLinks = (
    <ul>
      <p>Hello, {user ? user.name : 'friend'}</p>
      <li>
        <NavLink to="/auth/login">
          <i className="fas fa-duotone fa-right-to-bracket" id={styles.login}></i>
        </NavLink>
      </li>
      <li>
        <NavLink to="/auth/signup">
          <i className="fas fa-solid fa-id-card"></i>
        </NavLink>
      </li>
    </ul>
  )
  const protectedLinks = (
    <ul>
      <p>Hello, {user ? user.name : 'friend'}</p> 
      <li>
        <NavLink to="/profiles">
          <i className="fas fa-solid fa-user"></i>
        </NavLink>
      </li>
      <li>
        <NavLink to="/pets">
          <i className="fa-solid fa-cat"></i><i className="fa-solid fa-dog"></i> 
        </NavLink>
      </li>
      <li>
        <NavLink to="/pets/new">
          <i className="fa-solid fa-file-pen"></i>
        </NavLink>
      </li>
      <li>
        <NavLink to='/auth/logout' onClick={handleLogout}>
          <i className='fas fa-solid fa-door-open'></i>
        </NavLink> 
      </li>
      <li>
        <NavLink to='/auth/change-password'>
          Change Password
        </NavLink> 
      </li>
    </ul>
  )
  return (
    <nav className={styles.container}>
      <NavLink to='/'><img id={styles.logo} src={logo} alt="A cute pet" /></NavLink>
      {user ? protectedLinks : publicLinks}
    </nav>
  )
}

export default NavBar
