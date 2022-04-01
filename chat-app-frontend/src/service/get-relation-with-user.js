import axios from 'axios'
import config from '../constants/links'

export async function GetRelationWithUser(recepient) {
    const params = new URLSearchParams([['recepient', recepient]]);
    const user = await axios.get(config.getRelationWithUser, {params}, { withCredentials: true });
    return user.data;
}