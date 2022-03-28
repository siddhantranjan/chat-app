import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = () => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const [room, setRoom] = useState([])
  const socketRef = useRef();
  const { firstName, id } = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem('user'))
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { userId: id }
    });

    socketRef.current.on('rooms', (message) => {
      setRoom(message.items)
    });

    socketRef.current.on('messages', (message) => {
      message.forEach((i) => {
        i.ownedByCurrentUser = i.user.id === id
      })
      setMessages(message);
    });

    socketRef.current.on('messageAdded', (message) => {
      let incomingMessage = {
        ...message,
        ownedByCurrentUser: message.user.id === id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);

  const getRoom = () => {
    return room;
  }

  const sendMessage = (messageBody, roomName) => {
    const currentRoom = room.filter((value) => {
      return value.name === roomName
    })

    socketRef.current.emit('addMessage', {
      body: {
        text: messageBody,
        room: currentRoom[0],
      },
      senderId: socketRef.current.id,
      firstName
    });
  };

  const createRoom = (room) => {
    socketRef.current.emit('createRoom', room);
  }

  const joinRoom = async (room) => {
    socketRef.current.emit('joinRoom', room)
  }

  return { messages,sendMessage, joinRoom, createRoom, getRoom };
};

export default useChat;