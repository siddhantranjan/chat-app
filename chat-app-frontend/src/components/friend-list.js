import React from "react";
import './friend-list.css'

const FriendList = ({allFriends}) => {    
  return (
        <><div className="profile">
        <img className="user-profile" src={require("../public/user/profile.png")} alt="" />
    </div>
    <div style={{marginRight: "20px", width: "300px"}}>
    <p>{allFriends.firstName} {allFriends.lastName}</p>
    <p>{allFriends.username}</p>
    </div></>
  );
};

export default FriendList;