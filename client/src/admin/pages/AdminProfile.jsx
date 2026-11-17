import AdminLayout from "../components/AdminLayout.jsx";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";

export default function AdminProfile() {
  const { admin } = useAdminAuth();

  return (
    <AdminLayout>
      <div className="admin-profile">
        <h1>My Profile</h1>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">👤</div>
            <div className="profile-title">
              <h2>{admin?.name}</h2>
              <p>{admin?.email}</p>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-row">
              <label>Full Name</label>
              <span>{admin?.name}</span>
            </div>
            <div className="detail-row">
              <label>Email Address</label>
              <span>{admin?.email}</span>
            </div>
            <div className="detail-row">
              <label>Role</label>
              <span className="badge">{admin?.role}</span>
            </div>
            <div className="detail-row">
              <label>Account Status</label>
              <span className={`badge ${admin?.isActive ? "active" : "inactive"}`}>
                {admin?.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="detail-row">
              <label>Member Since</label>
              <span>{admin?.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "N/A"}</span>
            </div>
          </div>

          <div className="profile-actions">
            <p className="text-muted">
              Contact your administrator to change your password or profile information.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
