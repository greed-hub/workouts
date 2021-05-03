
import {Link} from 'react-router-dom'


const HamburgerNav = ({logOut, toggleMenu}) => {
    return (<>
        {toggleMenu ?
        
            <div className='hamburgerNav' >
                    {localStorage.getItem('token') !== null ? <div><Link to='/workouts' className='hamburgerText'>Workouts</Link></div> : ''} 
                    {localStorage.getItem('token') !== null ? <div><Link to='/statistics' className='hamburgerText'>Statistics</Link></div> : ''}
                    {localStorage.getItem('token') !== null ? '' : <div><Link to='/login' className='hamburgerText'>Sign in</Link></div>}
                    {localStorage.getItem('token') !== null ? '' : <div><Link to='/signup' className='hamburgerText'>Sign up</Link></div>}
                    {localStorage.getItem('token') !== null ? <div><Link to='/login' className='hamburgerText' onClick={logOut}>Sign out</Link></div> : ''}
            </div>
         : ''}
    </>)
}

export default HamburgerNav
