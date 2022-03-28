import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUser } from '../../service/get-user';
import useChat from "../../hooks/useChat";
import path from '../../constants/router'

export function CreateChatRoom() {
    const history = useNavigate()
    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('')

    const { createRoom } = useChat();

    const handleSubmit = async (event) => {
        event.preventDefault()
        const room = { description, name: roomName, users: users }
        createRoom(room)
        history(path.CHAT)
    }

    const addUser = async (event) => {
        event.preventDefault()
        const currentUser = await GetUser(email);
        const { id } = JSON.parse(localStorage.getItem('user'))
        if (currentUser.id === id) {
            console.log("Invalid Operation")
        } else {
            users.push(currentUser);
            setUsers(users)
            setEmail('')
        }
    }

    const handleCancel = (event) => {
        event.preventDefault()
        history(path.CHAT)
    }

    return (
        <div className="container">
            <div className='box'>
                <form className='formClass' onSubmit={handleSubmit}>
                    <input type="text" name="roomName" placeholder="Room Name" onChange={({ target }) => setRoomName(target.value)} value={roomName} />

                    <input type="text" name="description" placeholder="Description " onChange={({ target }) => setDescription(target.value)} value={description} />

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <input type="text" name="searchUsername" placeholder="Email " onChange={({ target }) => setEmail(target.value)} value={email} />
                        <button onClick={addUser} style={{ width: "fit-content", float: "right", marginRight: "40px" }}>Add User</button>
                        <ul>
                            {users.map((user, i) => (
                                <li key={i} style={{ marginRight: "40px", listStyleType:"none"}}>
                                    <p>{user.username}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <button type="submit">Create Room</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}