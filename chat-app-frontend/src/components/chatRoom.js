import React from "react";
import moment from "moment";
import "./chatRoom.css";

const ChatRoom = ({allMessages}) => {
  return (
    <div className="messages-container" id="style-14">
        <ol className="messages-list">
          {allMessages.length ? (allMessages.map((message, i) => (
            <li
            key={i}
            className={`message-item ${
              message.ownedByCurrentUser ? "my-message" : "received-message"
            }`}
          >
            <p className="message-info">{message.user.username}</p><br/>
            <p className="message-info">{moment(message.created_at).format('hh:mm A')}</p>
            <p className="message-body">{message.text}</p>
          </li>
          ))): (<div>No messages</div>)}
        </ol>
      </div>
  );
};

export default ChatRoom;