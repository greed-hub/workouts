import {Link} from 'react-router-dom'
import HamburgerNav from './HamburgerNav'
import { useState } from 'react'

const Header = ({logOut}) => {
    const [toggle, setToggle] = useState(false)

    return (
        <header style={{width: '80%', marginTop: '30px', marginLeft: '10%', display: 'flex'}}>
            
                <div>
                    <Link to='/' className='nav-style'>WORKOUTS</Link>
                </div>



                <div className='hideNav' style={{position: 'absolute', right: '10%'}}>
                    {localStorage.getItem('token') !== null ? <Link to='/workouts' className='nav-style'>Workouts</Link> : ''}  
                    {localStorage.getItem('token') !== null ? <Link to='/statistics' className='nav-style'>Statistics</Link> : ''}
                    {localStorage.getItem('token') !== null ? '' : <Link to='/login' className='nav-style'>Sign in</Link>}
                    {localStorage.getItem('token') !== null ? '' : <Link to='/signup' className='nav-style'>Sign up</Link>}
                    {localStorage.getItem('token') !== null ? <Link to='/login' onClick={logOut} className='nav-style'>Sign out</Link> : ''}  
                </div>

                <div onClick={() => setToggle(!toggle)} style={{position: 'absolute', right: '10%', paddingTop: '5px'}} className='hamburger'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <HamburgerNav logOut={logOut} toggleMenu={toggle}/>
                
        </header>
    )
}

export default Header
