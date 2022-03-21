import React from "react";
import './about.css'

const About = ({user}) => {      
  return (
    <div className="user-container">
        <div className="profile">
            <img className="user-profile" src={require("../public/user/profile.png")} alt="" />
        </div>
        <div style={{marginRight: "20px"}}>
        <p>{user.firstName} {user.lastName}</p>
        <p>{user.username}</p>
        <p>{user.phoneNo}</p>
        <p>{user.email}</p>
        </div>
    </div>
  );
};

export default About;