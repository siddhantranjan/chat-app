import React, { useState } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import useChat from '../../hooks/useChat';
import './chatHome.css';
import ChatRoom from '../../components/chatRoom';
import path from '../../constants/router'

export default function ChatHome() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([])
  const [roomName, setRoomName] = useState('')
  const [newMessage, setNewMessage] = useState('')

  const { getRoom, joinRoom, messages, sendMessage } = useChat()

  const handleJoinRoom = (event, currentRoom) => {
    event.preventDefault();
    joinRoom(currentRoom)
    setRoomName(currentRoom.name);
  }

  const handleCreateRoom = (event) => {
    event.preventDefault();
    navigate(path.CREATEROOM)
  }

  const handleSeeRoom = (event) => {
    event.preventDefault()
    const room = getRoom()
    setRooms(room);
  }

  const handleNewMessageChange = (event) => {
    event.preventDefault()
    setNewMessage(event.target.value)
  }

  const handleLeaveRoom = () => {
    const { username } = JSON.parse(localStorage.getItem('user'))
    navigate(generatePath(path.PROFILE, { username: username.substring(0, username.lastIndexOf('@')) }))
  }

  const handleSendMessage = (event) => {
    event.preventDefault()
    sendMessage(newMessage, roomName)
    setNewMessage('')
  }

  return (
    <div className="container">
      <div className="home-container">
        <div className='room-family'>
          {rooms && rooms.length !== 0 ? (rooms.map((currentRoom, i) => (
            <p key={i} onClick={(e) => handleJoinRoom(e, currentRoom)} style={{ cursor: "pointer" }}>{currentRoom.name}</p>
          ))) : null}
        </div>
        <div className='button-family'>
          <button className="enter-room-button" onClick={handleSeeRoom} >See room</button>
          <button className="enter-room-button" onClick={handleCreateRoom} >Create room</button>
        </div>
      </div>
      <div className="chat-room-container">
        <h1>Room: {roomName}</h1>
        <button className="leave-room" onClick={handleLeaveRoom}>Leave Room</button>
        <ChatRoom allMessages={messages} />
        <div className="input-send">
          <input
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write message..."
            className="new-message-input-field"
          />
          <button onClick={handleSendMessage} className="send-message-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
