import { Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";

const ICONS = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  box: (
    <>
      <path d="M21 8.5 12 3.5 3 8.5v7L12 20.5l9-5v-7Z" />
      <path d="m3 8.5 9 5 9-5" />
      <path d="M12 13.5v7" />
    </>
  ),
  plus: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  message: (
    <path d="M20.5 11.5a8 8 0 0 1-11.6 7.1L4 20.5l1.9-4.9A8 8 0 1 1 20.5 11.5Z" />
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </>
  ),
  settings: (
    <>
      <path d="M5 21v-6M5 11V3M12 21v-9M12 8V3M19 21v-4M19 13V3" />
      <path d="M2 15h6M9 8h6M16 17h6" />
    </>
  ),
  user: (
    <>
      <path d="M20 21v-1.5a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4V21" />
      <circle cx="12" cy="7.5" r="3.5" />
    </>
  ),
  logout: (
    <>
      <path d="M9.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4.5" />
      <path d="m16 16.5 4.5-4.5L16 7.5" />
      <path d="M20.5 12H9.5" />
    </>
  ),
};

function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

const menuItems = [
  { icon: "dashboard", label: "Dashboard", path: "/admin/dashboard" },
  { icon: "box", label: "Products", path: "/admin/products" },
  { icon: "plus", label: "Add Product", path: "/admin/products/add" },
  { icon: "message", label: "Enquiries", path: "/admin/enquiries" },
  { icon: "file", label: "Website Content", path: "/admin/content" },
  { icon: "settings", label: "Settings", path: "/admin/settings" },
  { icon: "user", label: "My Profile", path: "/admin/profile" },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const { logout } = useAdminAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
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
              <span className="menu-icon">
                <Icon name={item.icon} />
              </span>
              <span className="menu-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="btn btn-logout" onClick={logout}>
            <Icon name="logout" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
