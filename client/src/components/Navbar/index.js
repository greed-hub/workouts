import { FaBars, FaTimes } from "react-icons/fa";
import { Nav, NavbarContainer, NavLogo, NavMenu, NavItem, NavLink, MobileIcon, NavBtn, NavBtnLink } from './NavbarElements'


const Navbar = ({menuOpen, toggleMenu, logOut}) => {


  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to='/'>
            WORKOUTS
          </NavLogo>
          <MobileIcon onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </MobileIcon>
          <NavMenu>
            <NavItem>
              {localStorage.getItem('token') !== null ? <NavLink to='/workouts'>Workouts</NavLink> : ''}
            </NavItem>
            <NavItem>
              {localStorage.getItem('token') !== null ? <NavLink to='/statistics'>Stats</NavLink> : ''}
            </NavItem>
            <NavItem>
              {localStorage.getItem('token') !== null ? '' : <NavLink to='/signup'>Sign up</NavLink>}
            </NavItem>
            <NavItem>
              {localStorage.getItem('token') !== null ? <NavLink to='/login' onClick={logOut}>Sign out</NavLink> : ''}
            </NavItem>
          </NavMenu>
          <NavBtn>
            {localStorage.getItem('token') !== null ? '' : <NavBtnLink to='/login'>Sign in</NavBtnLink>}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar




