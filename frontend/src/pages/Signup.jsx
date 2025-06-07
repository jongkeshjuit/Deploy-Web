import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError, clearSuccess } from '../redux/slices/authSlice';
import { toast } from 'sonner';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        birth: '',
        gender: '',
        agreeToTerms: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { loading, error, success, userInfo } = useSelector((state) => state.auth);

    // Handle navigation after successful registration
    useEffect(() => {
        if (success && userInfo) {
            toast.success('Đăng ký thành công!');
            dispatch(clearSuccess());
            navigate('/');
        }
    }, [success, userInfo, navigate, dispatch]);

    // Handle error display
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name) {
            newErrors.name = 'Vui lòng nhập họ tên';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Vui lòng nhập địa chỉ email';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        // Birth date validation
        if (!formData.birth) {
            newErrors.birth = 'Vui lòng chọn ngày sinh';
        }

        // Gender validation
        if (!formData.gender) {
            newErrors.gender = 'Vui lòng chọn giới tính';
        }

        // Terms agreement validation
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'Vui lòng đồng ý với điều khoản sử dụng';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            dispatch(registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                gender: formData.gender,
                birth: formData.birth
            }));
        }
    };

    return (
        <div className="ml-24 mt-12 mb-36">
            <h2 className="text-3xl font-medium text-black mb-16">TẠO MỘT TÀI KHOẢN</h2>
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 items-start border border-[#DCDCDC] p-5 w-[55%]">
                <p className='w-3/4'>Chúng tôi sẽ gửi thư xác nhận đến địa chỉ email được liên kết với tài khoản của bạn. Hãy kiểm tra email đến từ chúng tôi.</p>

                {/* Name */}
                <div className="flex items-baseline gap-5 w-full">
                    <label htmlFor="name" className="w-1/4 text-xl font-medium text-black">
                        HỌ TÊN
                    </label>
                    <div className="w-3/4 flex flex-col">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Nhập họ tên"
                            className="w-full h-12 px-3 py-2 border-b-2 border-b-[#898989] bg-[#F5F5F5] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
                        />
                        {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-baseline gap-5 w-full">
                    <label htmlFor="email" className="w-1/4 text-xl font-medium text-black">
                        ĐỊA CHỈ EMAIL
                    </label>
                    <div className="w-3/4 flex flex-col">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Nhập email hợp lệ"
                            className="w-full h-12 px-3 py-2 border-b-2 border-b-[#898989] bg-[#F5F5F5] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
                        />
                        {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                    </div>
                </div>

                {/* Password */}
                <div className="flex items-baseline gap-5 w-full">
                    <label htmlFor="password" className="w-1/4 text-xl font-medium text-black">
                        MẬT KHẨU
                    </label>
                    <div className="w-3/4 flex flex-col">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Nhập mật khẩu"
                            className="w-full h-12 px-3 py-2 border-b-2 border-b-[#898989] bg-[#F5F5F5] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
                        />
                        {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        id="showPassword"
                        name="showPassword"
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="h-5 w-5 accent-black border-[#FFFFFF]"
                    />
                    <label htmlFor="showPassword" className="ml-2 block text-[16px] text-gray-700">
                        Hiện mật khẩu
                    </label>
                </div>

                {/* Birth Date */}
                <div className="flex items-baseline gap-5 w-full">
                    <label htmlFor="birth" className="w-1/4 text-xl font-medium text-black">
                        NGÀY SINH
                    </label>
                    <div className="w-3/4 flex flex-col">
                        <input
                            id="birth"
                            name="birth"
                            type="date"
                            value={formData.birth}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full h-12 px-3 py-2 border-b-2 border-b-[#898989] bg-[#F5F5F5] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
                        />
                        {errors.birth && <span className="text-red-500 text-sm mt-1">{errors.birth}</span>}
                    </div>
                </div>

                {/* Gender */}
                <div className="flex items-center gap-5 w-full">
                    <label className="w-1/4 text-xl font-medium text-black">
                        GIỚI TÍNH
                    </label>
                    <div className="w-3/4 flex gap-10">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                                disabled={loading}
                                className="h-5 w-5 accent-black"
                            />
                            <span className="ml-2">Nam</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                                disabled={loading}
                                className="h-5 w-5 accent-black"
                            />
                            <span className="ml-2">Nữ</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                checked={formData.gender === 'other'}
                                onChange={handleChange}
                                disabled={loading}
                                className="h-5 w-5 accent-black"
                            />
                            <span className="ml-2">Bỏ qua</span>
                        </label>
                        {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                    </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-center">
                    <div className="flex items-center">
                        <input
                            id="agreeToTerms"
                            name="agreeToTerms"
                            type="checkbox"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            disabled={loading}
                            className="h-5 w-5 accent-black border-[#FFFFFF]"
                        />
                        <label htmlFor="agreeToTerms" className="ml-2 block text-[16px] text-gray-700">
                            Tôi đồng ý với ĐIỀU KHOẢN SỬ DỤNG và CHÍNH SÁCH BẢO MẬT của Wukudada.
                        </label>
                    </div>
                </div>
                {errors.agreeToTerms && <span className="text-red-500 text-sm">{errors.agreeToTerms}</span>}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="flex justify-center py-[10px] px-25 border border-transparent text-[20px] font-medium text-white bg-black hover:bg-[#404040] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Đang xử lý...' : 'ĐĂNG KÝ'}
                </button>
            </form>
        </div>
    )
}

export default Signup