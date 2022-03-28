/* eslint-disable array-callback-return */
import { useNavigate } from "react-router";
import { SignOut } from "../service/user-signout";
import path from '../constants/router'
import { GetUser } from "../service/get-user";
import './profile.css'
import { useState } from "react";
import FriendList from "../components/friend-list";
import { GetRelation } from "../service/get-relation";
import About from "../components/about";
import { updateRelation } from "../service/update-relation";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [userRequest, setUserRequest] = useState({})
    const [friend, setFriend] = useState([])
    const [request, setRequest] = useState([])
    const [usernameInput, setUsernameInput] = useState('')
    const { name, username, id } = JSON.parse(localStorage.getItem('user'))

    const [choice, setChoice] = useState();

    const handleSignOut = async (event) => {
        event.preventDefault();
        await SignOut();
        navigate(path.LOGIN);
    }

    const getUser = async(event) => {
        event.preventDefault()
        const user = await GetUser(usernameInput);
        setUserRequest(user)
    }

    const sendRequest = async(event) => {
        event.preventDefault()
        if(userRequest.id === id){
            console.log('Error: Invalid Operation')
        }

        await updateRelation(userRequest.id, 'pending');
    }

    const handleUsernameChange = async (event) => {
        event.preventDefault()
        setUsernameInput(event.target.value)
    }

    const handleChoice = async (event, choice) => {
        event.preventDefault()

        if (choice === 'about') {
            const currentUser = await GetUser(username);
            setUser(currentUser)
        }

        if (choice === 'friends') {
            const friends = await GetRelation('friend')
            setFriend(friends)
        }

        if (choice === 'requests') {
            const requests = await GetRelation('pending')
            setRequest(requests)
        }
        setChoice(choice);
    }

    const goToChatPage = async (event) => {
        event.preventDefault()
        navigate(path.CHAT)
    }

    const handleConfirmRequest = async (event, id) => {
        await updateRelation(id, 'friend');
    }

    const handleBlockUser = async(event, friend) => {
        event.preventDefault()
        await updateRelation(friend.id, 'blocked');
    }

    return (
        <div>
            <main>

                <div className="user-header-wrapper flexbox">
                    <div className="user-header-inner flexbox">
                        <div className="user-header-overlay"></div>
                        <img className="user-header" src={require("../public/user/cover.jpg")} alt="" />
                    </div>
                </div>

                <div className="user-info-bar">
                    <div className="ufo-bar-col2">
                        <div className="ufo-bar-col2-inner">
                            <div className="user-icon-wrapper">
                                <img className="user-icon" src={require("../public/user/profile.png")} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="ufo-bar-col3">
                        <div className="ufo-bar-col3-inner">
                            <div className="username-wrapper-outer">
                                <div className="username-wrapper">
                                    <h3 className="username-dev">{name}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ufo-bar-col4">
                        <div className="ufo-bar-col4-inner">
                            <button className="button2 btn-primary2" onClick={goToChatPage}> Chat <div className="btn-secondary2"></div></button>
                            <button className="button2 btn-primary2" style={{ width: "auto" }} onClick={handleSignOut}> Sign Out <div className="btn-secondary2"></div></button>
                        </div>

                    </div>
                </div>
                <div className="user-info-bar2">
                    <div className="ufo-bar2-col1">
                    </div>
                    <div id="ufo-home" className="ufo-bar2-col2 ufo-bar2-block">
                        <div className="ufo-bar2-col2-inner flexbox">
                            <span><i className="uil uil-trophy"></i></span>
                            <h3 onClick={(e) => handleChoice(e, 'friends')}>Friends</h3>
                        </div>
                    </div>
                    <div id="ufo-images" className="ufo-bar2-col4 ufo-bar2-block">
                        <div className="ufo-bar2-col4-inner flexbox">
                            <span><i className="uil uil-comment-alt"></i></span>
                            <h3 onClick={(e) => handleChoice(e, 'requests')}>Requests</h3>
                        </div>
                    </div>
                    <div id="ufo-about" className="ufo-bar2-col6 ufo-bar2-block">
                        <div className="ufo-bar2-col6-inner flexbox">
                            <span><i className="uil uil-user"></i></span>
                            <h3 onClick={(e) => handleChoice(e, 'about')}>About</h3>
                        </div>
                    </div>
                    <div className="ufo-bar2-col7">
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "25%", marginTop: "20px" }}>
                        <input
                            value={usernameInput}
                            onChange={handleUsernameChange}
                            placeholder="Username"
                            className="new-message-input-field"
                        />
                        <button style={{ marginLeft: "2px", background: "transparent", border: "none", cursor: "pointer" }} onClick={getUser}>Search User</button>
                        {
                            Object.keys(userRequest).length ? (<div style={{marginLeft: "20px"}}>
                            <div >
                                <p>{userRequest.firstName} {userRequest.lastName}</p>
                                <p>{userRequest.username}</p>
                                <button onClick={sendRequest}>Add Friend</button>
                            </div>
                        </div>):(null)
                        }
                    </div>
                    {
                        choice === "friends" ? (
                            <div style={{ width: "40%" }}>
                                <ol>
                                    {friend.length ? (friend.map((friend, i) => (
                                        <li key={i} style={{ listStyleType: "none" }}>
                                            <div style={{display: "flex", justifyContent: "space-between"}}><FriendList allFriends={friend} /><div><button style={{width: "auto", fontSize: "12px", cursor: "pointer"}} onClick={(e) => handleBlockUser(e, friend)}>Block</button></div></div>
                                        </li>
                                    ))) : (<div>No Friends</div>)}
                                </ol></div>) : (null)
                    }
                    {
                        choice === "requests" ? (<ol>
                            {request.length ? (request.map((req, i) => (
                                <li key={i} style={{ listStyleType: "none" }}>
                                    <div className="list-container"><FriendList allFriends={req} /><p style={{ cursor: "pointer" }} onClick={(e) => handleConfirmRequest(e, req.id)}>Confirm Requests</p></div>
                                </li>
                            ))) : (<div>No Requests</div>)}
                        </ol>) : (null)
                    }
                    {
                        choice === "about" ? (<About user={user} />) : (null)
                    }</div>
            </main>
        </div>
    )
}