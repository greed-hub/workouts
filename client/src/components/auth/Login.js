import { useState } from 'react'
import { VscMail, VscKey } from "react-icons/vsc";


const Login = ({ logIn }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            setError('Please enter both fields')
            email === '' && document.querySelector('#validation1').classList.add('is-invalid');
            password === '' && document.querySelector('#validation2').classList.add('is-invalid');
            return
        }

        handleLogin()
    }

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

        if (data.errUser) {
            setError(data.errUser)
            document.querySelector('#validation1').classList.add('is-invalid');
        } else if (data.errPassword) {
            setError(data.errPassword)
            document.querySelector('#validation2').classList.add('is-invalid');
        } else {
            localStorage.setItem('token', data.token)
            localStorage.setItem('user_id', data.user.id)
            localStorage.setItem('isAuth', true)
            logIn()
            setEmail('')
            setPassword('')
        }
    }

    const clearValidation = () => {
        document.querySelector('#validation1').classList.remove('is-invalid'); 
        document.querySelector('#validation2').classList.remove('is-invalid');  
    }

    return (
        <div className='signcontainer'><div className='formcontainer'>
            <form onSubmit={onSubmit} noValidate>
                <div className="d-flex justify-content-center mb-3">
                    <span><h5>Sign in</h5></span>
                </div>

                <div className="">
                    <label className="form-label"><VscMail /> Email</label>
                    <input type="email" id="validation1" className="form-control"  onFocus={() => clearValidation()} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <div className="invalid-feedback">{error}</div>
                </div>

                <div className="">
                    <label className="form-label"><VscKey /> Password</label>
                    <input type="password" id="validation2" className="form-control" onFocus={() => clearValidation()} minLength="3" maxLength="11" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <div className="invalid-feedback">{error}</div>
                </div>

                <div className="d-flex justify-content-center">
                    <input type='submit' value='Submit' className='btn btn-submit mt-3' />
                </div>
                </form></div>
        </div>
    )
}

export default Login
