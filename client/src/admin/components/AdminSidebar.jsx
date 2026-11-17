import { Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";

export default function AdminSidebar({ isOpen, onClose }) {
  const { logout } = useAdminAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { icon: "📊", label: "Dashboard", path: "/admin/dashboard" },
    { icon: "🥛", label: "Products", path: "/admin/products" },
    { icon: "➕", label: "Add Product", path: "/admin/products/add" },
    { icon: "💬", label: "Contact Enquiries", path: "/admin/enquiries" },
    { icon: "📝", label: "Website Content", path: "/admin/content" },
    { icon: "⚙️", label: "Settings", path: "/admin/settings" },
    { icon: "👤", label: "My Profile", path: "/admin/profile" },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
            ✕
          </button>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
              onClick={onClose}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="btn btn-logout" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  );
}
