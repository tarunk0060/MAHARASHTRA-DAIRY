import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout.jsx";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";
import { fetchAdminProducts, deleteProduct } from "../services/adminApi.js";

export default function AdminProducts() {
  const { token } = useAdminAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminProducts(token, { search, category });
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [token, search, category]);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await deleteProduct(token, id);
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-products">
        <div className="page-header">
          <h1>Products</h1>
          <Link to="/admin/products/add" className="btn btn-primary">
            ➕ Add Product
          </Link>
        </div>

        {error && <div className="alert error">{error}</div>}

        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-select">
            <option value="">All Categories</option>
            <option value="milk">Milk</option>
            <option value="byproduct">By-Products</option>
          </select>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <span className="product-emoji">{product.emoji} </span>
                      {product.name}
                    </td>
                    <td>{product.category === "milk" ? "Milk" : "By-Product"}</td>
                    <td>{product.price || "N/A"}</td>
                    <td>
                      <span className={`badge ${product.available ? "available" : "unavailable"}`}>
                        {product.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="actions">
                      <Link to={`/admin/products/${product._id}`} className="btn btn-sm btn-secondary">
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(product._id, product.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">No products found</p>
        )}
      </div>
    </AdminLayout>
  );
}
