import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const ProfileInfo = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    birthday: "",
    gender: "",
    address: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Lấy thông tin user từ Redux store
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000';

  // Redirect to login if not authenticated
  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  // Cập nhật form với thông tin người dùng từ Redux
  useEffect(() => {
    if (userInfo) {
      setForm({
        email: userInfo.email || "",
        name: userInfo.name || "",
        phone: userInfo.phone || "",
        birthday: userInfo.birth
          ? new Date(userInfo.birth).toLocaleDateString("vi-VN")
          : "",
        gender: userInfo.gender === "male"
          ? "Nam"
          : userInfo.gender === "female"
            ? "Nữ"
            : "Khác",
        address: userInfo.address || ""
      });
    }
  }, [userInfo]);

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!form.name) newErrors.name = "Vui lòng nhập tên";
    if (!form.address) newErrors.address = "Vui lòng nhập địa chỉ";
    if (!form.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^\d{9,11}$/.test(form.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!form.birthday) newErrors.birthday = "Vui lòng nhập ngày sinh";
    if (!form.gender) newErrors.gender = "Vui lòng chọn giới tính";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // Chuyển đổi giới tính về dạng lưu trong database
      const genderMapping = {
        "Nam": "male",
        "Nữ": "female",
        "Khác": "other"
      };

      // Chuyển đổi ngày sinh về định dạng ISO
      let birthDate = form.birthday;
      if (form.birthday && form.birthday.includes('/')) {
        const parts = form.birthday.split('/');
        if (parts.length === 3) {
          birthDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }

      const userData = {
        name: form.name,
        gender: genderMapping[form.gender] || "other",
        birth: birthDate,
        address: form.address,
        phone: form.phone
      };

      const response = await axios.put(
        `${API_URL}/api/users/update-profile`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          }
        }
      );

      toast.success('Cập nhật thông tin thành công!');
      setIsEdit(false);

      // Cập nhật thông tin trong localStorage nếu cần
      const currentUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (currentUserInfo) {
        localStorage.setItem('userInfo', JSON.stringify({
          ...currentUserInfo,
          ...response.data
        }));
      }

    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
      toast.error('Có lỗi xảy ra khi cập nhật thông tin!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white border border-gray-200 p-4 sm:p-6 md:p-8 mb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h3 className="text-xl sm:text-2xl font-medium">HỒ SƠ CÁ NHÂN</h3>
        {isEdit ? (
          <button
            className=""
            onClick={() => setIsEdit(false)}
            disabled={loading}
          >
            Hủy
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 w-full sm:w-auto"
            onClick={() => setIsEdit(true)}
          >
            Sửa thông tin
          </button>
        )}
      </div>
      {isEdit ? (
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6"
          onSubmit={handleSave}
        >
          <div>
            <div className="mb-2 text-gray-600 font-semibold">
              ĐỊA CHỈ EMAIL
            </div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`mb-1 w-full border rounded px-3 py-2 ${errors.email ? "border-red-500" : ""
                }`}
              disabled={true} // Email không thể thay đổi
              required
            />
            {errors.email && (
              <div className="text-red-500 text-sm mb-3">{errors.email}</div>
            )}
            <div className="mb-2 text-gray-600 font-semibold">TÊN</div>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`mb-1 w-full border rounded px-3 py-2 ${errors.name ? "border-red-500" : ""
                }`}
              required
            />
            {errors.name && (
              <div className="text-red-500 text-sm mb-3">{errors.name}</div>
            )}
            <div className="mb-2 text-gray-600 font-semibold">ĐỊA CHỈ</div>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className={`mb-1 w-full border rounded px-3 py-2 ${errors.address ? "border-red-500" : ""
                }`}
              required
            />
            {errors.address && (
              <div className="text-red-500 text-sm mb-3">{errors.address}</div>
            )}
          </div>
          <div>
            <div className="mb-2 text-gray-600 font-semibold">
              ĐIỆN THOẠI DI ĐỘNG
            </div>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={`mb-1 w-full border rounded px-3 py-2 ${errors.phone ? "border-red-500" : ""
                }`}
              required
            />
            {errors.phone && (
              <div className="text-red-500 text-sm mb-3">{errors.phone}</div>
            )}
            <div className="mb-2 text-gray-600 font-semibold">SINH NHẬT</div>
            <input
              type="date"
              name="birthday"
              value={form.birthday.split("/").reverse().join("-")}
              onChange={(e) => {
                const val = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  birthday: val.split("-").reverse().join("/"),
                }));
              }}
              className={`mb-1 w-full border rounded px-3 py-2 ${errors.birthday ? "border-red-500" : ""
                }`}
              required
            />
            {errors.birthday && (
              <div className="text-red-500 text-sm mb-3">{errors.birthday}</div>
            )}
            <div className="mb-2 text-gray-600 font-semibold">GIỚI TÍNH</div>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={`mb-1 w-full border rounded px-3 py-2 ${errors.gender ? "border-red-500" : ""
                }`}
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
            {errors.gender && (
              <div className="text-red-500 text-sm mb-3">{errors.gender}</div>
            )}
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row justify-end gap-3 mt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 w-full md:w-auto"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          <div>
            <div className="mb-2 text-gray-600 font-semibold">
              ĐỊA CHỈ EMAIL
            </div>
            <div className="mb-4">{form.email}</div>
            <div className="mb-2 text-gray-600 font-semibold">TÊN</div>
            <div className="mb-4">{form.name}</div>
            <div className="mb-2 text-gray-600 font-semibold">ĐỊA CHỈ</div>
            <div className="mb-4">{form.address}</div>
          </div>
          <div>
            <div className="mb-2 text-gray-600 font-semibold">
              ĐIỆN THOẠI DI ĐỘNG
            </div>
            <div className="mb-4">{form.phone}</div>
            <div className="mb-2 text-gray-600 font-semibold">SINH NHẬT</div>
            <div className="mb-4">{form.birthday}</div>
            <div className="mb-2 text-gray-600 font-semibold">GIỚI TÍNH</div>
            <div className="mb-4">{form.gender}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileInfo;