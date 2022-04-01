import config from "../constants/links";
import axios from "axios";

export async function userSignUp(firstName, lastName, email, username, password, phoneNo) {
    let payload = { firstName, lastName, email, username, password, phoneNo: parseInt(phoneNo) };
    const user = await axios.post(config.signUp, payload, { withCredentials: true });
    return user.data;
}