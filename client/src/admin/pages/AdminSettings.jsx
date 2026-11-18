import AdminLayout from "../components/AdminLayout.jsx";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";

const companyInfo = {
  name: "MAHARASHTRA DAIRY",
  email: "bmainuddin30@gmail.com",
  phone: "+91-9930022119",
  address: "Valsang Taluka, District Solapur, Maharashtra, India",
};

export default function AdminSettings() {
  const { admin } = useAdminAuth();

  return (
    <AdminLayout>
      <div className="admin-settings">
        <h1>Settings</h1>

        <div className="settings-section">
          <h2>Company Information</h2>
          <div className="settings-info">
            <div className="info-row">
              <label>Company Name:</label>
              <span>{companyInfo.name}</span>
            </div>
            <div className="info-row">
              <label>Email:</label>
              <span>{companyInfo.email}</span>
            </div>
            <div className="info-row">
              <label>Phone:</label>
              <span>{companyInfo.phone}</span>
            </div>
            <div className="info-row">
              <label>Address:</label>
              <span>{companyInfo.address}</span>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>System Information</h2>
          <div className="settings-info">
            <div className="info-row">
              <label>Admin Account:</label>
              <span>{admin?.email}</span>
            </div>
            <div className="info-row">
              <label>Admin Name:</label>
              <span>{admin?.name}</span>
            </div>
            <div className="info-row">
              <label>Admin Role:</label>
              <span className="badge">{admin?.role}</span>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>About This Admin Panel</h2>
          <div className="about-info">
            <p>
              <strong>Maharashtra Dairy Admin Panel</strong> provides comprehensive management
              tools for:
            </p>
            <ul>
              <li>Product Management — add, edit, and manage dairy products</li>
              <li>Contact Management — view and manage customer enquiries</li>
              <li>Content Management — update website content sections</li>
              <li>Dashboard — view key statistics and recent activity</li>
            </ul>
            <p>
              <strong>Security Note:</strong> Always keep your login credentials secure and log
              out after completing your tasks.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
