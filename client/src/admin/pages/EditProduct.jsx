import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout.jsx";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";
import { fetchAdminProducts, updateProduct } from "../services/adminApi.js";

const emojis = ["🥛", "🍶", "🧈", "🧅", "🌾", "🍯", "🥞", "🧀"];

export default function EditProduct() {
  const { id } = useParams();
  const { token } = useAdminAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchAdminProducts(token);
        const product = products.find((p) => p._id === id);
        if (product) {
          setForm(product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [token, id]);

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
      setSaving(true);
      setError(null);
      await updateProduct(token, id, form);
      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Loading product...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!form) {
    return (
      <AdminLayout>
        <div className="alert error">Product not found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-form-page">
        <h1>Edit Product</h1>

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
                required
              />
            </div>

            <div className="form-group">
              <label>Marathi Name</label>
              <input
                type="text"
                name="marathiName"
                value={form.marathiName || ""}
                onChange={handleInputChange}
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
              <select name="emoji" value={form.emoji || "🥛"} onChange={handleInputChange}>
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
              value={form.description || ""}
              onChange={handleInputChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Benefits (comma-separated)</label>
            <textarea
              value={(form.benefits || []).join(", ")}
              onChange={(e) => handleArrayInput("benefits", e.target.value)}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Sizes (comma-separated)</label>
            <input
              type="text"
              value={(form.sizes || []).join(", ")}
              onChange={(e) => handleArrayInput("sizes", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={form.price || ""}
              onChange={handleInputChange}
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
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
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
