import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

const CollectionManagement = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/collections`);
        setCollections(res.data || []);
      } catch (err) {
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bộ sưu tập này không?")) {
      try {
        const userToken =
          localStorage.getItem("userToken") || localStorage.getItem("token");
        await axios.delete(`${API_URL}/api/collections/${id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setCollections(collections.filter((c) => c._id !== id));
        alert("Xóa bộ sưu tập thành công!");
      } catch (err) {
        alert("Xóa bộ sưu tập thất bại!");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý bộ sưu tập</h2>
        <Link
          to="/admin/collections/new"
          className="bg-black text-white px-4 py-2 hover:bg-gray-700 cursor-pointer"
        >
          Thêm bộ sưu tập
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-gray-500 border border-gray-100 border-collapse table-fixed">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="w-1/3 px-3 py-3">Tên bộ sưu tập</th>
              <th className="w-1/3 px-3 py-3">ID</th>
              <th className="w-1/3 px-3 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="p-4 text-center">
                  Đang tải...
                </td>
              </tr>
            ) : collections.length > 0 ? (
              collections.map((collection) => (
                <tr
                  key={collection._id}
                  className="bg-white border-b border-gray-100"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {collection.name}
                  </td>
                  <td className="p-4">{collection.id}</td>
                  <td className="p-4">
                    <Link
                      to={`/admin/collections/${collection.id}`}
                      className="inline-flex items-center bg-black text-white px-3 py-1 mr-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(collection.id)}
                      className="inline-flex items-center text-black px-3 py-1 border border-black hover:border-gray-700 hover:text-gray-700 cursor-pointer"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center">
                  Không có bộ sưu tập nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionManagement;
