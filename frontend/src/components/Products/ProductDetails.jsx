// import products from '../../data/sample-products.json';


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
// import { useCart } from "../Cart/CartContext";
import { addToCart } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const productFetchId = productId || id;

  const dispatch = useDispatch();

  // const { addToCart } = useCart();
  // đây để test, khi đã có backend thì xóa dòng này
  // const selectedProduct = products.find(
  //   (p) => p._id.$oid === productFetchId
  // );
  // // Lấy các sản phẩm cùng category, loại trùng chính nó
  // const similarProducts = products.filter(
  //   (p) => p.category === selectedProduct.category && p._id.$oid !== selectedProduct._id.$oid
  // );


  const { selectedProduct, similarProducts, loading, error } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState("");


  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductById(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  const [expandedSections, setExpandedSections] = useState({
    details: false,
    material: false,
    care: false,
  });

  useEffect(() => {
    if (selectedProduct?.images?.length) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  // if (loading) {
  //   return <div className="text-center p-10">Đang tải...</div>;
  // }

  // if (error) {
  //   return <div className="text-center text-red-500 p-10">{error}</div>;
  // }

  if (!selectedProduct) {
    return (
      <div className="text-center text-xl p-10 text-red-500">
        Không tìm thấy sản phẩm với id: {id}
      </div>
    );
  }

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

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        userId: user?._id,
        guestId,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Đã thêm vào giỏ hàng", {
          duration: 1000,
        });
      })
      .catch((error) => {
        toast.error(error?.message || "Có lỗi xảy ra khi thêm vào giỏ hàng");
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  return (
    <div className="pt-6">
      {selectedProduct && (
        <div className="mx-[50px] bg-white">
          <div className="flex flex-col md:flex-row gap-8">
            {/* left thumbnail */}
            <div className="md:w-2/3 w-full flex flex-col gap-4">
              {/* Desktop: 2 columns, 3 rows grid for images */}
              <div className="hidden md:grid grid-cols-2 w-full">
                {selectedProduct.images.slice(0, 6).map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden"
                  >
                    <img
                      src={image.url}
                      alt={image.altText || `thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {/* Mobile: horizontal scrollable thumbnails */}
              <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory">
                {selectedProduct.images.map((image, index) => (
                  <div key={index} className="flex-none w-full snap-center">
                    <img
                      src={image.url}
                      alt={image.altText || `thumbnail ${index + 1}`}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                ))}
              </div>
              {/* Product Description */}
              <div className="mt-8 pt-6">
                <div className="flex flex-col gap-2 border-b-2 border-gray-300 pb-4">
                  <h2 className="text-4xl font-normal">Mô tả</h2>
                  <p className="text-gray-500 text-base">
                    {/* Mã sản phẩm: {selectedProduct._id|| "Đang cập nhật"} */}
                    Mã sản phẩm: {selectedProduct._id.$oid || "Đang cập nhật"}
                  </p>
                </div>

                {/* Details Section */}
                <div className="border-b border-gray-300">
                  <button
                    onClick={() =>
                      setExpandedSections((prev) => ({
                        ...prev,
                        details: !prev.details,
                      }))
                    }
                    className="w-full py-3 flex justify-between items-center text-left"
                  >
                    <span className="font-normal text-lg">Chi tiết</span>
                    <span className="text-xl">
                      {expandedSections.details ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${expandedSections.details
                      ? "max-h-[500px] pb-4"
                      : "max-h-0"
                      }`}
                  >
                    <div className="space-y-2 text-gray-600">
                      <p className="text-base">{selectedProduct.description}</p>
                      {selectedProduct.details &&
                        selectedProduct.details.length > 0 && (
                          <ul className="list-disc pl-5 mt-2">
                            {selectedProduct.details.map((detail, idx) => (
                              <li key={idx} className="text-sm">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  </div>
                </div>

                {/* Material Section */}
                <div className="border-b border-gray-300">
                  <button
                    onClick={() =>
                      setExpandedSections((prev) => ({
                        ...prev,
                        material: !prev.material,
                      }))
                    }
                    className="w-full py-3 flex justify-between items-center text-left"
                  >
                    <span className="font-normal text-lg">Chất liệu</span>
                    <span className="text-xl">
                      {expandedSections.material ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${expandedSections.material
                      ? "max-h-[500px] pb-4"
                      : "max-h-0"
                      }`}
                  >
                    <div className="space-y-2 text-gray-600">
                      <p className="text-sm">
                        {selectedProduct.material || "Đang cập nhật"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Care Instructions Section */}
                <div className="border-b border-gray-300">
                  <button
                    onClick={() =>
                      setExpandedSections((prev) => ({
                        ...prev,
                        care: !prev.care,
                      }))
                    }
                    className="w-full py-3 flex justify-between items-center text-left"
                  >
                    <span className="font-normal text-lg">
                      Hướng dẫn bảo quản
                    </span>
                    <span className="text-xl">
                      {expandedSections.care ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${expandedSections.care ? "max-h-[500px] pb-4" : "max-h-0"
                      }`}
                  >
                    <div className="space-y-2 text-gray-600">
                      <p className="text-sm">
                        {selectedProduct.care || "Đang cập nhật"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col gap-6 md:w-1/3 md:sticky md:top-[88px] md:self-start">
              <h1 className="text-2xl md:text-3xl">{selectedProduct.name}</h1>
              {selectedProduct.discountPrice ? (
                <>
                  <p className="text-lg text-gray-600 line-through">
                    {selectedProduct.price.toLocaleString("vi-VN")} VND
                  </p>
                  <p className="text-xl font-bold text-red-600">
                    {selectedProduct.discountPrice.toLocaleString("vi-VN")} VND
                  </p>
                </>
              ) : (
                <p className="text-xl font-bold text-black">
                  {selectedProduct.price.toLocaleString("vi-VN")} VND
                </p>
              )}
              {/* Color */}
              <div>
                <p className="text-gray-700 font-medium">Màu sắc:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`aspect-square rounded-full border cursor-pointer ${selectedColor === color
                        ? "border-2 border-black"
                        : "border-gray-300"
                        }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                        filter: "brightness(0.9)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="text-gray-700 font-medium">Kích cỡ:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`aspect-square flex items-center justify-center border cursor-pointer text-sm font-medium ${selectedSize === size
                        ? "border-black text-black"
                        : "border-gray-400 text-gray-400"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex flex-col items-start gap-2">
                <p className="text-gray-700 font-medium">Số lượng:</p>
                <div className="flex items-center w-[30%] py-2 bg-gray-100 rounded-full">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="w-[30%] text-center hover:font-bold cursor-pointer"
                  >
                    <span>−</span>
                  </button>
                  <input
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value >= 1) {
                        setQuantity(value);
                      } else {
                        setQuantity(1);
                      }
                    }}
                    className="w-[40%] text-center bg-gray-100 text-lg outline-none"
                  />
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="w-[30%] text-center hover:font-bold cursor-pointer"
                  >
                    <span>+</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`bg-black text-lg text-white py-2 rounded-full w-full cursor-pointer ${isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-800"
                  }`}
              >
                {isButtonDisabled ? "Đang thêm..." : "Thêm vào giỏ hàng"}
              </button>
            </div>
          </div>
          <div className="mt-20 mb-10 mx-[50px]">
            <h2 className="text-2xl text-center font-medium mb-4">
              Sản phẩm tương tự
            </h2>
            {/* {similarProducts &&
              selectedProduct &&
              (() => {
                // Gộp tất cả sản phẩm liên quan thành 1 mảng
                const allRelated = [
                  ...(similarProducts.sameCategory || []),
                  ...(similarProducts.sameBrand || []),
                  ...(similarProducts.recommended || []),
                ];
                // Loại trùng và loại sản phẩm hiện tại
                const uniqueRelated = allRelated
                  .filter((p) => p._id !== selectedProduct._id)
                  .filter(
                    (p, idx, arr) =>
                      arr.findIndex((x) => x._id === p._id) === idx
                  );

                if (uniqueRelated.length === 0) return null;

                return (
                  <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-4 text-left">
                      Sản phẩm tương tự
                    </h2>
                    <ProductGrid products={uniqueRelated} />
                  </div>
                );
              })()} */}
            {similarProducts.length > 0 && (
              <div className="mt-20 mb-10 mx-[50px]">
                <h2 className="text-2xl text-center font-medium mb-4">
                  Sản phẩm tương tự
                </h2>
                <ProductGrid products={similarProducts} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
