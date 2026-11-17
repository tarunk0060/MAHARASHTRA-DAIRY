import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";
import { fetchDashboardStats, fetchAdminContacts, fetchAdminProducts } from "../services/adminApi.js";

export default function AdminDashboard() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, contactsData] = await Promise.all([
          fetchDashboardStats(token),
          fetchAdminContacts(token),
        ]);
        setStats(statsData);
        setRecentEnquiries(contactsData.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1>Dashboard</h1>

        {error && <div className="alert error">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🥛</div>
            <div className="stat-content">
              <h3>Total Products</h3>
              <p className="stat-value">{stats?.totalProducts || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Available</h3>
              <p className="stat-value">{stats?.availableProducts || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <h3>Unavailable</h3>
              <p className="stat-value">{stats?.unavailableProducts || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-content">
              <h3>Total Enquiries</h3>
              <p className="stat-value">{stats?.totalEnquiries || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🆕</div>
            <div className="stat-content">
              <h3>New Enquiries</h3>
              <p className="stat-value">{stats?.newEnquiries || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>Unresolved</h3>
              <p className="stat-value">{stats?.unresolvedEnquiries || 0}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Enquiries</h2>
          {recentEnquiries.length > 0 ? (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnquiries.map((enquiry) => (
                    <tr key={enquiry._id} className={enquiry.isRead ? "" : "unread"}>
                      <td>{enquiry.name}</td>
                      <td>{enquiry.email}</td>
                      <td>{enquiry.subject || "N/A"}</td>
                      <td>{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${enquiry.isResolved ? "resolved" : "pending"}`}>
                          {enquiry.isResolved ? "Resolved" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted">No enquiries yet</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
