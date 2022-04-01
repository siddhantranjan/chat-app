import './signup.css'
import { userSignUp } from '../service/user-signup'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import path from '../constants/router';

export function SignUp() {
    const history = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            await userSignUp(firstName, lastName, email, username, password, phoneNo);
            history(path.LOGIN)
        }catch(err) {
            setEmail('')
            setPassword('')
            setError(err.response.data.message)
        }
    }
    return(
        <div className="container">
            <div className='box'>
            <div style={{color: 'red'}}>{error.length !== 0 ? (<p>{error}</p>) : (null)}</div>
                <form className='formClass' onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="First Name"  onChange={({target}) => setFirstName(target.value)} value={firstName}/>

                    <input type="text" name="lastName" placeholder="Last Name" onChange={({target}) => setLastName(target.value)} value={lastName}/>

                    <input type="text" name="email" placeholder="Email " onChange={({target}) => setEmail(target.value)} value={email}/>

                    <input type="text" name="username" placeholder="Username " onChange={({target}) => setUsername(target.value)} value={username}/>

                    <input type="password" name="password" placeholder="Password" onChange={({target}) => setPassword(target.value)} value={password} />

                    <input type="text" name="phoneNo" placeholder="Phone" onChange={({target}) => setPhoneNo(target.value)} value={phoneNo}/>

                    <button type="submit" disabled={!email || password.length < 1 || !firstName || !lastName || !username || !phoneNo}>Submit</button>
                </form>

                <div className='alternative'>
                    <p>
                    Alread have a account{` `}
                    <Link to={path.LOGIN} className="buttonBox">Log In</Link>
                    </p>
                </div>
                </div>
            </div>
    )
}