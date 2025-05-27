import React from "react";
import { Route } from "react-router-dom";
import ProfileLayout from "./ProfileLayout";
import MyOdersPage from "./MyOdersPage";

const userInfo = {
  email: "nuyngan300405@gmail.com",
  name: "Nguyễn Văn A",
  phone: "0123456789",
  birthday: "19/08/2005",
  gender: "Nam",
  address: "123 Đường ABC, Quận 1, TP. HCM",
  barcode: "7253142133416",
};

const ProfileInfo = () => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
      <h3 className="text-2xl font-bold mb-6">HỒ SƠ</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="mb-2 text-gray-600 font-semibold">ĐỊA CHỈ EMAIL</div>
          <div className="mb-4">{userInfo.email}</div>
          <div className="mb-2 text-gray-600 font-semibold">TÊN</div>
          <div className="mb-4">{userInfo.name}</div>
          <div className="mb-2 text-gray-600 font-semibold">ĐỊA CHỈ</div>
          <div className="mb-4">{userInfo.address}</div>
        </div>
        <div>
          <div className="mb-2 text-gray-600 font-semibold">
            ĐIỆN THOẠI DI ĐỘNG
          </div>
          <div className="mb-4">{userInfo.phone}</div>
          <div className="mb-2 text-gray-600 font-semibold">SINH NHẬT</div>
          <div className="mb-4">{userInfo.birthday}</div>
          <div className="mb-2 text-gray-600 font-semibold">GIỚI TÍNH</div>
          <div className="mb-4">{userInfo.gender}</div>
        </div>
      </div>
      <div className="mt-8">
        <div className="font-semibold mb-2">MÃ VẠCH THÀNH VIÊN</div>
        <div className="flex items-center gap-4">
          <div className="bg-white border border-gray-300 p-4 rounded">
            <div className="font-mono text-2xl tracking-widest mb-2">
              {userInfo.barcode}
            </div>
            <img
              src={`https://barcode.tec-it.com/barcode.ashx?data=${userInfo.barcode}&code=Code128&translate-esc=false`}
              alt="barcode"
              className="h-12"
            />
          </div>
          <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
            In mã vạch
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Vui lòng đưa mã vạch trên thẻ thành viên này cho nhân viên thu ngân
          khi bạn thanh toán cho sản phẩm đã mua.
        </p>
      </div>
    </section>
  );
};

const ProfilePage = () => {
  return (
    <Routes>
      <Route path="/profile" element={<ProfileLayout />}>
        <Route path="info" element={<ProfileInfo />} />
        <Route path="orders" element={<MyOdersPage />} />
        <Route index element={<ProfileInfo />} />{" "}
        {/* Mặc định vào /profile sẽ hiện info */}
      </Route>
    </Routes>
  );
};

export default ProfilePage;
