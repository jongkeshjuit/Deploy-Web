import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";
const userToken =
  localStorage.getItem("userToken") || localStorage.getItem("token") || "";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== "new";
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    sizes: [],
    colors: [],
    collection: "",
    material: "",
    gender: "",
    images: [],
    dimensions: {
      length: "",
      width: "",
      height: "",
      weight: "",
    },
  });
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu sản phẩm khi vào trang (chỉ khi chỉnh sửa)
  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`${API_URL}/api/products/${id}`);
          setProductData({
            ...res.data,
            sizes: res.data.sizes || [],
            colors: res.data.colors || [],
            images: res.data.images || [],
            dimensions: res.data.dimensions || {
              length: "",
              width: "",
              height: "",
              weight: "",
            },
          });
        } catch (err) {
          alert("Không tìm thấy sản phẩm!");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else {
      setLoading(false); // Nếu là tạo mới thì không cần loading
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Xử lý upload ảnh
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
      setProductData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          { url: response.data.imageUrl, alt: "Product Image" },
        ],
      }));
    }
  };
  // Xử lý submit cập nhật sản phẩm
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userToken) {
      alert("Bạn cần đăng nhập admin để thực hiện thao tác này!");
      return;
    }
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!productData.images || productData.images.length === 0) {
      alert("Bạn phải upload ít nhất 1 ảnh sản phẩm!");
      return;
    }
    if (
      !productData.dimensions ||
      !productData.dimensions.length ||
      !productData.dimensions.width ||
      !productData.dimensions.height ||
      !productData.dimensions.weight
    ) {
      alert("Bạn phải nhập đầy đủ kích thước (length, width, height, weight)!");
      return;
    }
    const fixedProductData = {
      ...productData,
      user: userInfo?._id || userInfo?.id,
      price: Number(productData.price),
      discountPrice: Number(productData.discountPrice),
      countInStock: Number(productData.countInStock),
      sizes: Array.isArray(productData.sizes) ? productData.sizes : [],
      colors: Array.isArray(productData.colors) ? productData.colors : [],
      images: (productData.images || []).map((img) => ({
        url: img.url,
        altText: img.altText || img.alt || "Product Image",
      })),
      dimensions: {
        length: Number(productData.dimensions.length),
        width: Number(productData.dimensions.width),
        height: Number(productData.dimensions.height),
        weight: Number(productData.dimensions.weight),
      },
      gender:
        productData.gender === "man"
          ? "man"
          : productData.gender === "woman"
            ? "woman"
            : "",
    };
    console.log("Dữ liệu gửi lên:", fixedProductData);
    console.log("Các trường bắt buộc:");
    console.log("name:", fixedProductData.name);
    console.log("description:", fixedProductData.description);
    console.log(
      "price:",
      fixedProductData.price,
      typeof fixedProductData.price
    );
    console.log("sku:", fixedProductData.sku);
    console.log("category:", fixedProductData.category);
    console.log(
      "sizes:",
      fixedProductData.sizes,
      Array.isArray(fixedProductData.sizes)
    );
    console.log(
      "colors:",
      fixedProductData.colors,
      Array.isArray(fixedProductData.colors)
    );
    console.log("collection:", fixedProductData.collection);
    console.log("material:", fixedProductData.material);
    console.log("gender:", fixedProductData.gender);
    console.log(
      "images:",
      fixedProductData.images,
      Array.isArray(fixedProductData.images)
    );
    console.log("dimensions:", fixedProductData.dimensions);
    console.log("user:", fixedProductData.user);
    try {
      if (isEdit) {
        await axios.put(`${API_URL}/api/products/${id}`, fixedProductData, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        alert("Cập nhật sản phẩm thành công!");
      } else {
        await axios.post(`${API_URL}/api/products`, fixedProductData, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        alert("Tạo sản phẩm mới thành công!");
      }
      navigate("/admin/products");
    } catch (err) {
      alert("Thao tác thất bại!");
    }
  };
  if (loading)
    return <div className="text-center mt-10">Đang tải sản phẩm...</div>;
  return (
    <div className="w-full mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4">
        {/* name */}
        <div className="">
          <label className="block font-medium text-lg">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            required
          />
        </div>
        {/* description */}
        <div className="">
          <label className="block font-medium text-lg">Mô tả</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            rows={4}
            required
          />
        </div>
        {/* price */}
        <div className="">
          <label className="block font-medium text-lg">Giá</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
          />
        </div>
        {/* count In Stock */}
        <div className="">
          <label className="block font-medium text-lg">Số lượng</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
          />
        </div>
        {/* SKU */}
        <div className="">
          <label className="block font-medium text-lg">Mã sản phẩm</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
          />
        </div>
        {/* size */}
        <div className="">
          <label className="block font-medium text-lg">
            Kích thước (cách nhau bằng dấu phẩy)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData((prevData) => ({
                ...prevData,
                sizes: e.target.value
                  .split(",")
                  .map((size) => size.trim().toUpperCase()),
              }))
            }
            className="w-full border border-gray-300 p-2"
          />
        </div>
        {/* color */}
        <div className="">
          <label className="block font-medium text-lg">Màu sắc</label>
          {productData.colors.map((color, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Tên màu (VD: Navy)"
                value={color.name}
                onChange={(e) =>
                  setProductData((prevData) => {
                    const updatedColors = [...prevData.colors];
                    updatedColors[idx].name = e.target.value;
                    return { ...prevData, colors: updatedColors };
                  })
                }
                className="border p-1 w-1/2"
              />
              <input
                type="text"
                placeholder="Mã màu (VD: #000080)"
                value={color.code}
                onChange={(e) =>
                  setProductData((prevData) => {
                    const updatedColors = [...prevData.colors];
                    updatedColors[idx].code = e.target.value;
                    return { ...prevData, colors: updatedColors };
                  })
                }
                className="border p-1 w-1/2"
              />
              <button
                type="button"
                onClick={() =>
                  setProductData((prevData) => ({
                    ...prevData,
                    colors: prevData.colors.filter((_, i) => i !== idx),
                  }))
                }
                className="text-red-600"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setProductData((prevData) => ({
                ...prevData,
                colors: [...prevData.colors, { name: "", code: "" }],
              }))
            }
            className="text-blue-600"
          >
            + Thêm màu
          </button>

        </div>
        {/* category */}
        <div className="">
          <label className="block font-medium text-lg">Danh mục</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            placeholder="Enter category"
            required
          />
        </div>
        {/* collection */}
        <div className="">
          <label className="block font-medium text-lg">Bộ sưu tập</label>
          <input
            type="text"
            name="collection"
            value={productData.collection}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            placeholder="Enter collection"
            required
          />
        </div>
        {/* material */}
        <div className="">
          <label className="block font-medium text-lg">Chất liệu</label>
          <input
            type="text"
            name="material"
            value={productData.material}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            placeholder="Enter material"
            required
          />
        </div>
        {/* gender */}
        <div className="">
          <label className="block font-medium text-lg">Giới tính</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="gender"
                value="men"
                checked={productData.gender === "man"}
                onChange={(e) =>
                  setProductData((prevData) => ({
                    ...prevData,
                    gender: e.target.checked ? "man" : "",
                  }))
                }
              />
              Nam
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="gender"
                value="woman"
                checked={productData.gender === "woman"}
                onChange={(e) =>
                  setProductData((prevData) => ({
                    ...prevData,
                    gender: e.target.checked ? "woman" : "",
                  }))
                }
              />
              Nữ
            </label>
          </div>
        </div>
        {/* images */}
        <div className="">
          <label className="block font-medium text-lg">Ảnh</label>
          <div className="flex gap-4 mb-2">
            {productData.images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={img.alt || "Product Image"}
                className="w-20 h-20 object-cover border"
              />
            ))}
          </div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        {/* dimensions */}
        <div className="mb-6">
          <label className="block font-medium text-lg">Kích thước (cm)</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="length"
              placeholder="Chiều dài"
              value={productData.dimensions?.length || ""}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, length: e.target.value },
                }))
              }
              className="border border-gray-300 p-2"
              required
            />
            <input
              type="number"
              name="width"
              placeholder="Chiều rộng"
              value={productData.dimensions?.width || ""}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, width: e.target.value },
                }))
              }
              className="border border-gray-300 p-2"
              required
            />
            <input
              type="number"
              name="height"
              placeholder="Chiều cao"
              value={productData.dimensions?.height || ""}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, height: e.target.value },
                }))
              }
              className="border border-gray-300 p-2"
              required
            />
            <input
              type="number"
              name="weight"
              placeholder="Khối lượng (kg)"
              value={productData.dimensions?.weight || ""}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, weight: e.target.value },
                }))
              }
              className="border border-gray-300 p-2"
              required
            />
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            onClick={() => navigate("/admin/products")}
          >
            Hủy bỏ thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
