import config from "../constants/links";
import axios from "axios";

export async function updateRelation(recepient, status) {
    let payload = { recepient, status };
    try{
        const user = await axios.patch(config.updateRelation, payload, { withCredentials: true });
        return user.data;
    }catch(err){
        throw new Error(err.message)
    }
}