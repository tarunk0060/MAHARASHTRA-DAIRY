import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAdminAuth();
  const navigate = useNavigate();
  const [logoError, setLogoError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="admin-login">
      <div className="login-background">
        <div className="login-shapes shape-1"></div>
        <div className="login-shapes shape-2"></div>
        <div className="login-shapes shape-3"></div>
      </div>

      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <div className="logo-circle">
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="Maharashtra Dairy Logo"
                  className="logo-img"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span>🐄</span>
              )}
            </div>
            <h1>Maharashtra Dairy</h1>
            <p>Admin Dashboard</p>
            <p className="tagline">Pure • Fresh • Traditional</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="alert error">
                <span className="alert-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@maharashtradairy.com"
                  required
                  disabled={loading}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <span className="label-icon">🔐</span>
                Password
              </label>
              <div className="input-wrapper password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-login"
              disabled={loading}
            >
              <span>{loading ? "Logging in..." : "Login to Dashboard"}</span>
              {loading ? "⏳" : "→"}
            </button>
          </form>

          <div className="login-footer">
            <p className="security-note">
              <span>🔒</span> Secure Admin Access Only
            </p>
            <p className="version-info">Admin Panel v1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
