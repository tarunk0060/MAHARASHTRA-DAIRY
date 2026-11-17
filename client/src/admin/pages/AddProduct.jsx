import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout.jsx";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";
import { createProduct } from "../services/adminApi.js";

const emojis = ["🥛", "🍶", "🧈", "🧅", "🌾", "🍯", "🥞", "🧀"];

export default function AddProduct() {
  const { token } = useAdminAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    marathiName: "",
    category: "milk",
    description: "",
    benefits: [],
    sizes: [],
    price: "",
    emoji: "🥛",
    available: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayInput = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category) {
      setError("Product name and category are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await createProduct(token, form);
      alert("Product created successfully");
      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-form-page">
        <h1>Add New Product</h1>

        {error && <div className="alert error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="e.g., Fresh Milk"
                required
              />
            </div>

            <div className="form-group">
              <label>Marathi Name</label>
              <input
                type="text"
                name="marathiName"
                value={form.marathiName}
                onChange={handleInputChange}
                placeholder="e.g., ताज्या दूध"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={form.category} onChange={handleInputChange}>
                <option value="milk">Milk</option>
                <option value="byproduct">By-Product</option>
              </select>
            </div>

            <div className="form-group">
              <label>Emoji</label>
              <select name="emoji" value={form.emoji} onChange={handleInputChange}>
                {emojis.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Describe the product..."
            />
          </div>

          <div className="form-group">
            <label>Benefits (comma-separated)</label>
            <textarea
              value={form.benefits.join(", ")}
              onChange={(e) => handleArrayInput("benefits", e.target.value)}
              rows="3"
              placeholder="e.g., Rich in calcium, Full of protein, Pasteurized"
            />
          </div>

          <div className="form-group">
            <label>Sizes (comma-separated)</label>
            <input
              type="text"
              value={form.sizes.join(", ")}
              onChange={(e) => handleArrayInput("sizes", e.target.value)}
              placeholder="e.g., 500ml, 1L, 2L"
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              placeholder="e.g., ₹35/L"
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleInputChange}
              />
              Available for Sale
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Product"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
