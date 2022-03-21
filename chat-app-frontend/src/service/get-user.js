import axios from 'axios'
import config from '../constants/links'

export async function GetUser(username) {
    const params = new URLSearchParams([['email', username]]);
    const user = await axios.get(config.getUser, {params}, { withCredentials: true });
    return user.data[0];
}