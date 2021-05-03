import { useState } from 'react'
import { VscAccount, VscMail, VscKey, VscSmiley } from "react-icons/vsc";


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('')
    const [emailError, setEmailError] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            setError('Please enter all fields')
            email === '' &&  setEmailError('Please enter all fields');
            name === '' && document.querySelector('#validation1').classList.add('is-invalid');
            email === '' && document.querySelector('#validation2').classList.add('is-invalid');
            password === '' && document.querySelector('#validation3').classList.add('is-invalid');
            confirmPassword === '' && document.querySelector('#validation4').classList.add('is-invalid');
            return
        }

        if (password !== '' && confirmPassword !== '' && password !== confirmPassword) {
            setError('Passwords do not match')
            document.querySelector('#validation3').classList.add('is-invalid'); 
            document.querySelector('#validation4').classList.add('is-invalid');
            return
        }

        if (!email.includes('@')) {
            setEmailError('Invalid email format')
            document.querySelector('#validation2').classList.remove('is-valid'); 
            document.querySelector('#validation2').classList.add('is-invalid');  
            return
        }

        registerUser();
    }


    const registerUser = async () => {
        const response = await fetch('api/users', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        const data = await response.json()
        if (data.err) {
            setError(data.err);
            document.querySelector('#validation2').classList.add('is-invalid');
            return
        }
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        clearValidation()
    }

    const handleEmail = async () => {
        if (email !== '' && email.includes('@')) {
            const response = await fetch(`api/users/e`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({email})
            })
            const verify = await response.json();

            if (verify.err) {
                setEmailError(verify['err']);
                document.querySelector('#validation2').classList.remove('is-valid'); 
                document.querySelector('#validation2').classList.add('is-invalid');    
            }

            if (verify.msg) {
                document.querySelector('#validation2').classList.remove('is-invalid'); 
                document.querySelector('#validation2').classList.add('is-valid');  
            }
        } else if (email !== '') {
            setEmailError('Invalid email format')
            document.querySelector('#validation2').classList.remove('is-valid'); 
            document.querySelector('#validation2').classList.add('is-invalid');  
        }
    }

    const clearValidation = () => {
        document.querySelector('#validation1').classList.remove('is-invalid'); 
        document.querySelector('#validation2').classList.remove('is-invalid', 'is-valid');
        document.querySelector('#validation3').classList.remove('is-invalid'); 
        document.querySelector('#validation4').classList.remove('is-invalid');
    }

    return (
        <div className='signcontainer'><div className='formcontainer'>

            <form onSubmit={onSubmit} noValidate>
            
            <div className="d-flex justify-content-center mb-3">
                    <span><h5>Sign up</h5></span>
                </div>
                
                <div className="">
                    <label htmlFor="validation1" className="form-label"><VscAccount /> Username</label>
                    <input type="text" className="form-control" id="validation1" value={name} onFocus={(e) => clearValidation()}  onChange={(e) => setName(e.target.value)} required />
                    <div className="invalid-feedback">{error}</div>
                </div>

                <div className="">
                    <label htmlFor="validation2" className="form-label"><VscMail /> Email</label>
                    <input type="email" className="form-control" id="validation2" value={email} onBlur={() => handleEmail()} onFocus={(e) => clearValidation()}  onChange={(e) => setEmail(e.target.value)} required />
                    <div className="invalid-feedback">{emailError}</div>
                    <div className="valid-feedback"><VscSmiley /> Email available</div>
                </div>

                <div className="">
                    <label htmlFor="validation3" className="form-label"><VscKey /> Password</label>
                    <input type="password" className="form-control" id="validation3" minLength="3" maxLength="11" onFocus={(e) => clearValidation()}  value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <div className="invalid-feedback">{error}</div>
                </div>

                <div className="">
                    <label htmlFor="validation4" className="form-label"><VscKey /> Confirm password</label>
                    <input type="password" className="form-control" id="validation4" minLength="3" maxLength="11" onFocus={(e) => clearValidation()} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <div className="invalid-feedback">{error}</div>
                </div>
                <div className="d-flex justify-content-center">
                    <input type='submit' value='Submit' className='btn btn-submit mt-3' />
                </div>
            </form></div>
        </div>
    )
}

export default Register