// frontend/src/utils/axiosInterceptor.js
import axios from 'axios';
import store from '../redux/store';
import { logoutUser } from '../redux/slices/authSlice';
import { toast } from 'sonner';

// Setup axios interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401) {
      const errorData = error.response.data;
      
      // Nếu token expired hoặc invalid thì auto logout
      if (errorData?.expired || errorData?.invalid || errorData?.message === "Token expired") {
        // Prevent infinite loop
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          
          // Dispatch logout
          store.dispatch(logoutUser());
          
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
          
          // Redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default axios;