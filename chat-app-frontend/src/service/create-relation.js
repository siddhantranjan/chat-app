import config from "../constants/links";
import axios from "axios";

export async function createRelation(recepient, status) {
    let payload = { recepient, status };
    try{
        const user = await axios.post(config.createRelation, payload, { withCredentials: true });
        return user.data;
    }catch(err){
        throw new Error(err.message)
    }
}