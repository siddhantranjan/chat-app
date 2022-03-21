import './signup.css'
import { userSignUp } from '../service/user-signup'
import { useState } from 'react';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import path from '../constants/router';

export function SignUp() {
    const history = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()
        const user = await userSignUp(firstName, lastName, email, username, password, phoneNo);
        localStorage.setItem("user", JSON.stringify({username: user.email, name: firstName + ' ' + lastName, id: user.id}))
        history(generatePath(path.PROFILE, {username: email.substring(0, email.lastIndexOf('@'))}))
    }
    return(
        <div className="container">
            <div className='box'>
                <form className='formClass' onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="First Name"  onChange={({target}) => setFirstName(target.value)} value={firstName}/>

                    <input type="text" name="firstName" placeholder="Last Name" onChange={({target}) => setLastName(target.value)} value={lastName}/>

                    <input type="text" name="email" placeholder="Email " onChange={({target}) => setEmail(target.value)} value={email}/>

                    <input type="text" name="username" placeholder="Username " onChange={({target}) => setUsername(target.value)} value={username}/>

                    <input type="password" name="password" placeholder="Password" onChange={({target}) => setPassword(target.value)} />

                    <input type="text" name="phoneNo" placeholder="Phone" onChange={({target}) => setPhoneNo(target.value)} value={phoneNo}/>

                    <button type="submit">Submit</button>
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