import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const token = searchParams.get("token");
      const error = searchParams.get("error");

      if (token) {
        try {
          // Save token to localStorage
          localStorage.setItem("userToken", token);

          // Get user profile with the token
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const { data } = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL || "http://localhost:9000"
            }/api/users/profile`,
            config
          );

          // Save user info
          localStorage.setItem("userInfo", JSON.stringify(data));

          // Update Redux state
          dispatch({
            type: "auth/loginUser/fulfilled",
            payload: {
              user: data,
              token: token,
            },
          });

          toast.success("Đăng nhập Google thành công!");
          navigate("/");
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast.error("Lỗi khi lấy thông tin người dùng");
          navigate("/login");
        }
      } else if (error) {
        toast.error("Đăng nhập Google thất bại");
        navigate("/login");
      } else {
        navigate("/login");
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Đang xử lý đăng nhập...
          </h2>
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
          <p className="text-gray-600">Vui lòng đợi trong giây lát</p>
        </div>
      </div>
    </div>
  );
};

export default GoogleCallback;
