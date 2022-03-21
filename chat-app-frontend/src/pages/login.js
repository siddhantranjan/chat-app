import {  useState } from 'react';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import path from '../constants/router';
import { userSignIn } from '../service/user-login';
import { GetUser } from '../service/get-user'
import './signup.css'


export function LogIn() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault()
        const {username, id} = await userSignIn(email, password);
        const {firstName, lastName} = await GetUser(username)
        localStorage.setItem("user", JSON.stringify({username, name: firstName + ' ' + lastName, id}))
        history(generatePath(path.PROFILE, {username: email.substring(0, email.lastIndexOf('@'))}))
    }
    
    return(
        <div className="container">
            <div className='box'>
                <form className='formClass' onSubmit={handleSubmit}>
                    <input type="text" name="email" placeholder="Email " onChange={({target}) => setEmail(target.value)} value={email}/>

                    <input type="password" name="password" placeholder="Password" onChange={({target}) => setPassword(target.value)} />

                    <button type="submit">Submit</button>
                </form>
                <div className='alternative'>
                    <p>
                    Don't have an account?{` `}
                    <Link to={path.SIGNUP} className="buttonBox">Sign Up</Link>
                    </p>
                </div>
                </div>
            </div>
    )
}