import {Link} from 'react-router-dom'
import HamburgerNav from './HamburgerNav'
import { useState } from 'react'

const Header = ({logOut, logIn}) => {
    const [toggle, setToggle] = useState(false)
    const [email] = useState(process.env.log)
    const [password] = useState(process.env.pass)

    const handleLogin = async () => {
        const input = {email, password}
        const response = await fetch('api/auth', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
                body: JSON.stringify(input)
        })
        const data = await response.json()
        
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_id', data.user._id)
        localStorage.setItem('isAuth', true)
        logIn()
    }
    

    return (
        <header style={{width: '80%', marginTop: '30px', marginLeft: '10%', display: 'flex'}}>
            
                <div>
                    <Link to='/' className='nav-style'>WORKOUTS</Link>
                </div>



                <div className='hideNav' style={{position: 'absolute', right: '10%'}}>
                    {localStorage.getItem('token') !== null ? '' : <button className='btn btnCTA' onClick={() => handleLogin()}>Test user</button> }  
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
                <HamburgerNav logOut={logOut} login={() => handleLogin()} toggleMenu={toggle}/>
                
        </header>
    )
}

export default Header
