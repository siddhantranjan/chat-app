import config from "../constants/links";
import axios from "axios";

export async function userSignIn(email, password) {
     let payload = { username: email, password };
    const {data} = await axios.post(config.signIn, payload, { withCredentials: true });
    return data;
}