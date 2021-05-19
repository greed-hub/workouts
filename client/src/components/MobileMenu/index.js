import { MobileMenuContainer, Mobile, MobileLink } from './MobileMenuElements';


const MobileMenu = ({ menuOpen, logOut }) => {
  return (
    <MobileMenuContainer menuOpen={menuOpen}>
      <Mobile>
        {localStorage.getItem('token') !== null ? <MobileLink to='/workouts'>Workouts</MobileLink> : ''} 
        {localStorage.getItem('token') !== null ? <MobileLink to='/statistics'>Stats</MobileLink> : ''}
        {localStorage.getItem('token') !== null ? '' : <MobileLink to='/login'>Sign in</MobileLink>}
        {localStorage.getItem('token') !== null ? '' : <MobileLink to='/signup'>Sign up</MobileLink>}
        {localStorage.getItem('token') !== null ? <MobileLink to='/login' onClick={logOut}>Sign out</MobileLink> : ''}
      </Mobile>
    </MobileMenuContainer>
  )
}

export default MobileMenu


