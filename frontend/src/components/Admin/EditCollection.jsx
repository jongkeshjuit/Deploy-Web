import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

const EditCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== "new";
  const [collectionData, setCollectionData] = useState({
    id: "",
    name: "",
    description: "",
    image: "",
    status: "active",
    categories: [],
  });
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const userToken =
    localStorage.getItem("userToken") || localStorage.getItem("token") || "";

  useEffect(() => {
    if (isEdit) {
      const fetchCollection = async () => {
        try {
          const res = await axios.get(`${API_URL}/api/collections/${id}`);
          setCollectionData({
            id: res.data.id || "",
            name: res.data.name || "",
            description: res.data.description || "",
            image: res.data.bannerUrl || "",
            status: res.data.status || "active",
            categories: res.data.categories || [],
          });
        } catch (err) {
          alert("Không tìm thấy bộ sưu tập!");
        } finally {
          setLoading(false);
        }
      };
      fetchCollection();
    } else {
      setLoading(false);
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    if (collectionData.categories.includes(newCategory.trim())) {
      alert("Danh mục này đã tồn tại!");
      return;
    }
    setCollectionData((prev) => ({
      ...prev,
      categories: [...prev.categories, newCategory.trim()],
    }));
    setNewCategory("");
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCollectionData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat !== categoryToRemove),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!userToken) {
      alert("Bạn cần đăng nhập admin để upload ảnh!");
      return;
    }
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setCollectionData((prev) => ({
        ...prev,
        image: response.data.imageUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userToken) {
      alert("Bạn cần đăng nhập admin để thực hiện thao tác này!");
      return;
    }
    if (!collectionData.name) {
      alert("Bạn phải nhập tên bộ sưu tập!");
      return;
    }
    if (!collectionData.image) {
      alert("Bạn phải upload ảnh đại diện cho bộ sưu tập!");
      return;
    }

    try {
      if (isEdit) {
        const payload = {
          name: collectionData.name,
          bannerUrl: collectionData.image,
          description: collectionData.description,
          status: collectionData.status,
          categories: collectionData.categories,
        };
        await axios.put(
          `${API_URL}/api/collections/${collectionData.id}`,
          payload,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        alert("Cập nhật bộ sưu tập thành công!");
      } else {
        if (!collectionData.id) {
          alert("Bạn phải nhập ID cho bộ sưu tập!");
          return;
        }
        const payload = {
          id: collectionData.id,
          name: collectionData.name,
          bannerUrl: collectionData.image,
          description: collectionData.description,
          status: collectionData.status,
          products: [],
          categories: collectionData.categories,
        };
        await axios.post(`${API_URL}/api/collections`, payload, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        alert("Tạo bộ sưu tập mới thành công!");
      }
      navigate("/admin/collections");
    } catch (err) {
      alert("Thao tác thất bại!");
    }
  };

  if (loading)
    return <div className="text-center mt-10">Đang tải bộ sưu tập...</div>;

  return (
    <div className="w-full mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-xl mx-auto"
      >
        {/* ID bộ sưu tập */}
        {!isEdit ? (
          <div>
            <label className="block font-medium text-lg">
              ID bộ sưu tập (phải là duy nhất)
            </label>
            <input
              type="text"
              name="id"
              value={collectionData.id}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2"
              required
            />
          </div>
        ) : (
          <div>
            <label className="block font-medium text-lg">ID bộ sưu tập</label>
            <input
              type="text"
              value={collectionData.id}
              disabled
              className="w-full border border-gray-300 p-2 bg-gray-100 text-gray-500"
            />
          </div>
        )}

        {/* Tên bộ sưu tập */}
        <div>
          <label className="block font-medium text-lg">Tên bộ sưu tập</label>
          <input
            type="text"
            name="name"
            value={collectionData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            required
          />
        </div>

        {/* Mô tả */}
        <div>
          <label className="block font-medium text-lg">Mô tả</label>
          <textarea
            name="description"
            value={collectionData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            rows={4}
          />
        </div>

        {/* Danh mục sản phẩm */}
        <div>
          <label className="block font-medium text-lg">Danh mục sản phẩm</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nhập tên danh mục"
              className="flex-1 border border-gray-300 p-2"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Thêm
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {collectionData.categories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{category}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ảnh đại diện */}
        <div>
          <label className="block font-medium text-lg">Ảnh đại diện</label>
          {collectionData.image && (
            <div className="mb-2">
              <img
                src={collectionData.image}
                alt="Collection"
                className="w-32 h-32 object-cover border mb-2"
              />
              <button
                type="button"
                onClick={() =>
                  setCollectionData((prev) => ({ ...prev, image: "" }))
                }
                className="text-red-600 underline text-sm"
              >
                Xóa ảnh
              </button>
            </div>
          )}
          <div className="mb-2">
            <button
              type="button"
              onClick={() => document.getElementById("fileInput").click()}
              className="bg-gray-200 px-2 py-1 border border-gray-300 hover:bg-gray-300"
            >
              Chọn ảnh
            </button>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block font-medium text-lg">Trạng thái</label>
          <select
            name="status"
            value={collectionData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Ẩn</option>
          </select>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {isEdit ? "Lưu thay đổi" : "Tạo mới"}
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            onClick={() => navigate("/admin/collections")}
          >
            Hủy bỏ
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCollection;
