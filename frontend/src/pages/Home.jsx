import React, { useState, useEffect } from "react";
import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import { getProducts } from "../services/productService";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

const Home = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // Lấy tất cả sản phẩm
        const response = await getProducts();
        const products = response.products || [];
        // Lấy danh sách collection từ API
        const collectionsRes = await axios.get(`${API_URL}/api/collections`);
        const collectionsData = collectionsRes.data;
        // Map sản phẩm vào từng collection
        const collectionsMap = {};
        collectionsData.forEach((col) => {
          collectionsMap[col.id] = {
            ...col,
            products: [],
          };
        });
        products.forEach((product) => {
          if (collectionsMap[product.collection]) {
            collectionsMap[product.collection].products.push(product);
          }
        });
        const collections = Object.values(collectionsMap);
        setCollections(collections);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải dữ liệu bộ sưu tập");
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  if (loading) return <div className="text-center mt-10">Đang tải...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <>
      {/* <Hero />
      <h1 className="text-center text-4xl font-normal  mb-6 mt-10">
        Khám phá bộ sưu tập độc đáo của Wukudada
      </h1> */}
      <div className="mb-[50px]">
        <FeaturedCollection
          collections={collections.filter((col) => col.status === "active")}
        />
      </div>
    </>
  );
};

export default Home;
