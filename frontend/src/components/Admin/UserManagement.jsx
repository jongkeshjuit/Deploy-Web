import React, { useState } from 'react'

const UserManagement = () => {

    const users = [
        {
            _id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "admin",
        },
        {
            _id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "customer",
        },
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    const handleRoleChange = (userId, newRole) => {
        console.log(userId, newRole);
        // setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
    }

    const handleDelete = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            // setUsers(users.filter(user => user.id !== userId));
            console.log("Deleting user with ID:", userId);
        }
    }

    return (
        <div className='w-full mx-auto p-6 flex gap-6'>
            {/* add new user form */}
            <div className='mb-6 w-1/4'>
                <h2 className='text-2xl font-bold'>Thêm tài khoản mới</h2>
                <form onSubmit={handleSubmit} className='space-y-2'>
                    <div>
                        <label className='block text-gray-700'>Tên người dùng</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700'>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700'>Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700'>Vai trò</label>
                        <select name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300'
                            required
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type='submit'
                        className='bg-black text-white px-4 py-2 hover:bg-gray-700 cursor-pointer'>
                        Add User
                    </button>
                </form>
            </div>

            {/* user list */}
            <div className='overflow-x-auto w-3/4'>
                <h2 className='text-2xl font-bold mb-6'>Quản lý tài khoản</h2>
                <table className='min-w-full text-left text-gray-500 border border-gray-100 border-collapse'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                        <tr>
                            <th className='px-3 py-3'>Họ và tên</th>
                            <th className='px-3 py-3'>Email</th>
                            <th className='px-3 py-3'>Vai trò</th>
                            <th className='px-3 py-3'>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className='bg-white border-b border-gray-100'>
                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{user.name}</td>
                                <td className='p-4'>{user.email}</td>
                                <td className='p-4'>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className='p-2 border border-gray-300'
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className='p-4'>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className='text-black px-2 py-1 border border-black hover:border-gray-700 hover:text-gray-700 cursor-pointer'>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserManagement