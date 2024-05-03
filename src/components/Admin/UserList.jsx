import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUserListbyAdmin = async () => {
            try {
                const response = await fetch("https://restaurant-backend-1-ixbn.onrender.com/users/getusers", {
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user list");
                }
                const data = await response.json();
                const sortedUsers = data.sort((a, b) => a.username.localeCompare(b.username));
                setUsers(sortedUsers);
                // console.log(sortedUsers);
            } catch (error) {
                console.error("Error fetching user list:", error);
            }
        }

        fetchUserListbyAdmin();
    }, [])


    return (
        <div className="p-4">
            <h2 className="text-center mb-4">List of Users</h2>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Address</th>
                            <th>Phonenumber</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.username}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.address}</td>
                                <td>{user.phonenumber}</td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            </div>
        </div>
    )
}

export default UserList;