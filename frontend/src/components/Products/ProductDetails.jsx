import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { collections } from "../../assets/dummyData";
import { useCart } from "../Cart/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    let allProducts = [];
    collections.forEach((c) => {
      allProducts = allProducts.concat(c.products);
    });

    const found = allProducts.find((p) => p._id === id);
    setProduct(found);
    if (found?.images?.length) setMainImage(found.images[0].url);
  }, [id]);

  // 🔥 Không được return trước hooks
  const similarProducts = collections
    .find((c) => c.products.some((p) => p._id === id))
    ?.products.filter((p) => p._id !== id)
    .sort(() => Math.random() - 0.5)
    .slice(
      0,
      Math.ceil(
        collections.find((c) => c.products.some((p) => p._id === id))?.products
          .length / 2
      )
    );

  const handleQuantityChange = (action) => {
    setQuantity((prev) =>
      action === "plus" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Vui lòng chọn kích thước và màu sắc");
      return;
    }

    setIsButtonDisabled(true);
    addToCart(product, quantity, selectedSize, selectedColor);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500);
  };

  if (!product) {
    return (
      <div className="text-center text-xl p-10 text-red-500">
        Product not found for id: {id}
      </div>
    );
  }

  return (
    <div className="pt-6">
      <div className="mx-[50px] bg-white">
        <div className="flex flex-col md:flex-row gap-4">
          {/* left thumbnail */}
          <div className="flex gap-4 md:w-2/3">
            <div className="hidden md:flex flex-col gap-4">
              {product.images.map((image, index) => (
                <img
                  src={image.url}
                  alt={image.altText || `thumbnail ${index + 1}`}
                  key={index}
                  className="w-24 h-24 object-cover"
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
            {/* main image */}
            <div className="w-full">
              <div className="mb-4">
                <img
                  src={mainImage || product.images[0]?.url}
                  alt="Main Product"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* mobile thumbnail */}
            <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
              {product.images?.map((image, index) => (
                <img
                  src={image.url}
                  alt={image.altText || `thumbnail ${index + 1}`}
                  key={index}
                  className="w-16 h-16 object-cover rounded-md"
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
          </div>
          {/* right side */}
          <div className="md:w-1/3 md:ml-10">
            <h1 className="text-2xl md:text-3xl mb-2">{product.name}</h1>
            {product.discountPrice ? (
              <>
                <p className="text-lg text-gray-600 mb-1 line-through">
                  {product.price.toLocaleString("vi-VN")} VND
                </p>
                <p className="text-xl font-bold text-red-600 mb-4">
                  {product.discountPrice.toLocaleString("vi-VN")} VND
                </p>
              </>
            ) : (
              <p className="text-xl font-bold text-black mb-4">
                {product.price.toLocaleString("vi-VN")} VND
              </p>
            )}
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="mb-4">
              <p className="text-gray-700 font-medium">Màu sắc:</p>
              <div className="flex gap-2 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border cursor-pointer ${
                      selectedColor === color
                        ? "border-2 border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.7)",
                    }}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 font-medium">Kích cỡ:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 flex items-center justify-center border cursor-pointer text-sm font-medium ${
                      selectedSize === size
                        ? "border-black text-black"
                        : "border-gray-400 text-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 flex flex-col items-start gap-2">
              <p className="text-gray-700 font-medium">Số lượng:</p>
              <div className="flex items-center w-[30%] py-1 bg-gray-100 rounded-full">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="w-[30%] text-center hover:font-bold cursor-pointer"
                >
                  -
                </button>
                <input
                  // type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 1) {
                      setQuantity(value);
                    } else {
                      setQuantity(1); // fallback nếu người dùng xóa hết
                    }
                  }}
                  className="w-[40%] text-center bg-gray-100 text-lg outline-none"
                />
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="w-[30%] text-center hover:font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white px-6 py-2 rounded-full w-full ${
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-800"
              }`}
            >
              {isButtonDisabled ? "Đang thêm..." : "Thêm vào giỏ hàng"}
            </button>

            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-medium mb-4">Characteristics</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="font-medium">Material</td>
                    <td>{product.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 mb-10 mx-[50px]">
        <h2 className="text-2xl text-center font-medium mb-4">
          You may also like
        </h2>
        <ProductGrid product={similarProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
