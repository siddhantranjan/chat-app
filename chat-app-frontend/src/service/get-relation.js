import axios from 'axios'
import config from '../constants/links'

export async function GetRelation(relation) {
    const params = new URLSearchParams([['status', relation]]);
    const user = await axios.get(config.getRelation, {params}, { withCredentials: true });
    return user.data;
}