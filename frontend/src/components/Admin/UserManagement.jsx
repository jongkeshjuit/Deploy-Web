import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userToken } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    });

    // Fetch users
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/users`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Không thể tải danh sách người dùng");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [userToken]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/admin`, formData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            toast.success("Thêm người dùng thành công!");
            // Reset form
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "customer",
            });
            // Refresh user list
            fetchUsers();
        } catch (err) {
            console.error("Error creating user:", err);
            toast.error(err.response?.data?.message || "Không thể tạo người dùng");
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`${API_URL}/api/admin/${userId}`,
                { role: newRole },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            toast.success("Cập nhật vai trò thành công!");
            // Update local state
            setUsers(users.map(user =>
                user._id === userId ? { ...user, role: newRole } : user
            ));
        } catch (err) {
            console.error("Error updating user role:", err);
            toast.error("Không thể cập nhật vai trò người dùng");
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            try {
                await axios.delete(`${API_URL}/api/admin/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                toast.success("Xóa người dùng thành công!");
                // Update local state
                setUsers(users.filter(user => user._id !== userId));
            } catch (err) {
                console.error("Error deleting user:", err);
                toast.error("Không thể xóa người dùng");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
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
                        Thêm người dùng
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
                                        className='text-black px-2 py-1 border border-black hover:border-gray-700 hover:text-gray-700 cursor-pointer'>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;