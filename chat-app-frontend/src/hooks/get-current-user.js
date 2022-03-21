import { useEffect, useState } from "react";
import { GetUser } from '../service/get-user'

export function GetCurrentUser() {
    const [user, setUser ] = useState(null);

    useEffect(() => {
        async function getUser(){
            const currentUser = await GetUser();
            if(currentUser){
                setUser(currentUser);
            }else{
                setUser(null);
            }
        }

        getUser();
    }, []);

    return user;
}