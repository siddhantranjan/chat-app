import React from "react";
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
            <p className="message-body">{message.text}</p>
          </li>
          ))): (null)}
        </ol>
      </div>
  );
};

export default ChatRoom;