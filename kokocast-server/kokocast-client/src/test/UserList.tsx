// @ts-ignore
import React, {useState, useEffect} from 'react';
import axios from "axios";


interface User {
    id: number;
    nickname: string;
}

function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        axios.get('/test/user/list')
            .then(res => {
                setUsers(res.data)
            });
    }, []);

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        axios.get('/test/user/register', {
            params: {
                nickname: nickname
            }
        }).then(res => {
            setUsers(res.data)
        });
    };

    const handleDelete = (userId: number) => {
        axios.get('/test/user/delete', {
            params: {
                id: userId
            }
        })
            .then(res => {
                setUsers(res.data)
            });
    };

    return (
        <div>
            <h1>사용자 목록</h1>
            <ul>
                {users.map(user => (
                    <li key=
                            {user.id}>{user.id} :: {user.nickname}
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Nickname"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default UserList;
