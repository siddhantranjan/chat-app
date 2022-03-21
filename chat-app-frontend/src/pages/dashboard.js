import { useNavigate, generatePath } from 'react-router-dom';
import path from '../constants/router';
import { SignOut } from "../service/user-signout";
import './dashboard.css'

export function Dashboard() {
    const history = useNavigate();

    const handleProfile = (event) =>{
        event.preventDefault();
        const {username} = JSON.parse(localStorage.getItem('user'))
        history(generatePath(path.PROFILE, {username: username.substring(0, username.lastIndexOf('@'))}))
    }

    const handleSignOut = async (event) => {
        event.preventDefault();
        await SignOut();
        history(path.LOGIN);
    }

    return(
        <div style={{display: "flex"}}>
            <div className="first" style={{position: "absolute", left: "5%", top: "-15%", width: "5%", fontSize: "5px", height: "fit-content"}}>
            <h1 onClick={handleSignOut}>Sign Out</h1>
            </div>
            <div className="first"  style={{position: "absolute", top: "20%",width: "30%",  left: "35%", textAlign: "center", transform: "translate(0, -50%)"}}>
            <h1 onClick={handleProfile}>Profile</h1>
            </div>
            <div style={{position: "absolute", top: "30%",width: "100%", textAlign: "center", transform: "translate(0, -50%)", fontSize: "40px"}}>
            <p>Chat App Project</p>
        </div>
        </div>
    )
}