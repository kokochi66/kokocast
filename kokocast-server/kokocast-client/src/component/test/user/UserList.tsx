// @ts-ignore
import React, { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
}

function UserList() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch('/test/user/list')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUsers(data)
            });
    }, []);

    return (
        <div>
            <h1>사용자 목록</h1>
    <ul>
    {users.map(user => (
            <li key={user.id}>{user.name}</li>
        ))}
    </ul>
    </div>
);
}

export default UserList;
