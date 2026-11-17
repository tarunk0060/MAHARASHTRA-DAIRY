import { useAdminAuth } from "../context/AdminAuthContext.jsx";

export default function AdminHeader({ onMenuToggle }) {
  const { admin } = useAdminAuth();

  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
          ☰
        </button>
        <h1 className="header-title">Maharashtra Dairy Admin</h1>
      </div>

      <div className="header-right">
        {admin && (
          <div className="admin-info">
            <span className="admin-name">{admin.name}</span>
            <span className="admin-role">{admin.role}</span>
          </div>
        )}
      </div>
    </header>
  );
}
