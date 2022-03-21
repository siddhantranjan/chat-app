import path from '../constants/links';
import axios from 'axios';

export async function SignOut() {
    await axios.get(path.signOut, { withCredentials: true })
    localStorage.setItem('user', null);
}