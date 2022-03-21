import { Navigate, Outlet, generatePath } from "react-router";
import path from '../constants/router';


export default function IsUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user ? <Navigate to={generatePath(path.PROFILE, {username: user.username.substring(0, user.username.lastIndexOf('@'))})} /> : <Outlet />
}