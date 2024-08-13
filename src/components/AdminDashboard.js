import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const res = await fetch('https://backend-e154.onrender.com/admin/users', {
          headers: { 'Authorization': token },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const results = await res.json();
        setUsers(results);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`https://backend-e154.onrender.com/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': token },
      });

      if (!res.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Xóa người dùng thất bại');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Quản lý người dùng</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td> {/* Display the email */}
              <td>
                <button onClick={() => handleDelete(user.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;