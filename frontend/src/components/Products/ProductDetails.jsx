import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useCart } from "../Cart/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, fetchSimilarProducts } from "../../redux/slices/productsSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { addToCart } = useCart();

  const { selectedProduct: product, similarProducts, loading, error } = useSelector((state) => state.products);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState("");

  const [expandedSections, setExpandedSections] = useState({
    details: false,
    material: false,
    care: false
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
      dispatch(fetchSimilarProducts(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product?.images?.length) {
      setMainImage(product.images[0].url);
    }
  }, [product]);

  if (loading) {
    return <div className="text-center p-10">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-10">{error}</div>;
  }

  if (!product) {
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
    addToCart(product, quantity, selectedSize, selectedColor);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500);
  };

  const handleSubmitReview = () => {
    if (!newReviewRating || !newReviewComment.trim()) {
      toast.error("Vui lòng chọn số sao và nhập nội dung đánh giá");
      return;
    }

    const newReview = {
      userName: "Khách hàng",
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toISOString(),
    };

    setProduct(prev => ({
      ...prev,
      reviews: [newReview, ...(prev.reviews || [])]
    }));

    setNewReviewRating(0);
    setNewReviewComment("");

    toast.success("Cảm ơn bạn đã đánh giá sản phẩm!");
  };

  return (
    <div className="pt-6">
      <div className="mx-[50px] bg-white">
        <div className="flex flex-col md:flex-row gap-8">
          {/* left thumbnail */}
          <div className="md:w-2/3 w-full flex flex-col gap-4">
            {/* Desktop: 2 columns, 3 rows grid for images */}
            <div className="hidden md:grid grid-cols-2 w-full">
              {product.images.slice(0, 6).map((image, index) => (
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
              {product.images.map((image, index) => (
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
                <p className="text-gray-500 text-base">Mã sản phẩm: {product._id || "Đang cập nhật"}</p>
              </div>

              {/* Details Section */}
              <div className="border-b border-gray-300">
                <button
                  onClick={() => setExpandedSections(prev => ({ ...prev, details: !prev.details }))}
                  className="w-full py-3 flex justify-between items-center text-left"
                >
                  <span className="font-normal text-lg">Chi tiết</span>
                  <span className="text-xl">{expandedSections.details ? '−' : '+'}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedSections.details ? 'max-h-[500px] pb-4' : 'max-h-0'
                  }`}>
                  <div className="space-y-2 text-gray-600">
                    <p className="text-base">{product.description}</p>
                    {product.details && product.details.length > 0 && (
                      <ul className="list-disc pl-5 mt-2">
                        {product.details.map((detail, idx) => (
                          <li key={idx} className="text-sm">{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Material Section */}
              <div className="border-b border-gray-300">
                <button
                  onClick={() => setExpandedSections(prev => ({ ...prev, material: !prev.material }))}
                  className="w-full py-3 flex justify-between items-center text-left"
                >
                  <span className="font-normal text-lg">Chất liệu</span>
                  <span className="text-xl">{expandedSections.material ? '−' : '+'}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedSections.material ? 'max-h-[500px] pb-4' : 'max-h-0'
                  }`}>
                  <div className="space-y-2 text-gray-600">
                    <p className="text-sm">{product.material || "Đang cập nhật"}</p>
                  </div>
                </div>
              </div>

              {/* Care Instructions Section */}
              <div className="border-b border-gray-300">
                <button
                  onClick={() => setExpandedSections(prev => ({ ...prev, care: !prev.care }))}
                  className="w-full py-3 flex justify-between items-center text-left"
                >
                  <span className="font-normal text-lg">Hướng dẫn bảo quản</span>
                  <span className="text-xl">{expandedSections.care ? '−' : '+'}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedSections.care ? 'max-h-[500px] pb-4' : 'max-h-0'
                  }`}>
                  <div className="space-y-2 text-gray-600">
                    <p className="text-sm">{product.care || "Đang cập nhật"}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Product Reviews */}
            <div className="mt-8 pt-6">
              <h2 className="text-4xl font-normal mb-4">Đánh giá sản phẩm</h2>

              {/* Review Form */}
              <div className="mb-6 p-4">
                <h3 className="font-normal text-lg mb-3">Viết đánh giá</h3>
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setNewReviewRating(i + 1)}
                      className={`text-xl ${i < newReviewRating ? "text-yellow-400" : "text-gray-300"
                        }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                  className="w-full p-2 border border-gray-300 mb-3 h-[100px] resize-none outline-none"
                />
                <button
                  onClick={handleSubmitReview}
                  disabled={!newReviewRating || !newReviewComment.trim()}
                  className="px-4 py-2 bg-black text-white rounded-md disabled:bg-gray-300"
                >
                  Gửi đánh giá
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-300 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {review.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{review.userName}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-gray-300"
                                  }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(review.date).toLocaleDateString("vi-VN")}
                      </p>

                      {/* Staff Response */}
                      {review.response && (
                        <div className="ml-8 mt-3 p-3 bg-gray-50 rounded-md">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-xs font-medium text-blue-600">S</span>
                            </div>
                            <p className="font-medium text-sm">Phản hồi từ cửa hàng</p>
                          </div>
                          <p className="text-gray-600 text-sm">{review.response}</p>
                          <p className="text-gray-400 text-xs mt-1">
                            {new Date(review.responseDate).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
                )}
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="flex flex-col gap-6 md:w-1/3 md:sticky md:top-[88px] md:self-start">
            <h1 className="text-2xl md:text-3xl">{product.name}</h1>
            {product.discountPrice ? (
              <>
                <p className="text-lg text-gray-600 line-through">
                  {product.price.toLocaleString("vi-VN")} VND
                </p>
                <p className="text-xl font-bold text-red-600">
                  {product.discountPrice.toLocaleString("vi-VN")} VND
                </p>
              </>
            ) : (
              <p className="text-xl font-bold text-black">
                {product.price.toLocaleString("vi-VN")} VND
              </p>
            )}
            {/* Color */}
            <div>
              <p className="text-gray-700 font-medium">Màu sắc:</p>
              <div className="flex gap-2 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border cursor-pointer ${selectedColor === color
                      ? "border-2 border-black"
                      : "border-gray-300"
                      }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
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
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 flex items-center justify-center border cursor-pointer text-sm font-medium ${selectedSize === size
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
      </div>
      <div className="mt-20 mb-10 mx-[50px]">
        <h2 className="text-2xl text-center font-medium mb-4">
          Sản phẩm tương tự
        </h2>
        <ProductGrid product={similarProducts} />
      </div>
    </div >
  );
};

export default ProductDetails;
