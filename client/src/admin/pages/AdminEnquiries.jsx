import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";
import { fetchAdminContacts, updateContact, deleteContact } from "../services/adminApi.js";

export default function AdminEnquiries() {
  const { token } = useAdminAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const resolved = filter === "all" ? undefined : filter === "resolved" ? true : false;
      const data = await fetchAdminContacts(token, { search, resolved });
      setEnquiries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [token, search, filter]);

  const toggleRead = async (id) => {
    const enquiry = enquiries.find((e) => e._id === id);
    try {
      await updateContact(token, id, { isRead: !enquiry.isRead });
      setEnquiries(
        enquiries.map((e) => (e._id === id ? { ...e, isRead: !e.isRead } : e))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleResolved = async (id) => {
    const enquiry = enquiries.find((e) => e._id === id);
    try {
      await updateContact(token, id, { isResolved: !enquiry.isResolved });
      setEnquiries(
        enquiries.map((e) => (e._id === id ? { ...e, isResolved: !e.isResolved } : e))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      await deleteContact(token, id);
      setEnquiries(enquiries.filter((e) => e._id !== id));
      setSelectedId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-enquiries">
        <h1>Contact Enquiries</h1>

        {error && <div className="alert error">{error}</div>}

        <div className="filters">
          <input
            type="text"
            placeholder="Search by name, email or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-select">
            <option value="all">All Enquiries</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="spinner"></div>
            <p>Loading enquiries...</p>
          </div>
        ) : enquiries.length > 0 ? (
          <div className="enquiries-grid">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry._id}
                className={`enquiry-card ${enquiry.isRead ? "" : "unread"} ${
                  selectedId === enquiry._id ? "selected" : ""
                }`}
                onClick={() => setSelectedId(enquiry._id)}
              >
                <div className="enquiry-header">
                  <h3>{enquiry.name}</h3>
                  <span className={`badge ${enquiry.isResolved ? "resolved" : "pending"}`}>
                    {enquiry.isResolved ? "Resolved" : "Pending"}
                  </span>
                </div>

                <p className="enquiry-email">{enquiry.email}</p>
                {enquiry.phone && <p className="enquiry-phone">📞 {enquiry.phone}</p>}
                {enquiry.subject && <p className="enquiry-subject">📌 {enquiry.subject}</p>}

                <p className="enquiry-message">{enquiry.message.substring(0, 100)}...</p>

                <p className="enquiry-date">
                  {new Date(enquiry.createdAt).toLocaleString()}
                </p>

                <div className="enquiry-actions">
                  <button
                    className={`btn btn-sm ${enquiry.isRead ? "btn-secondary" : "btn-primary"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRead(enquiry._id);
                    }}
                  >
                    {enquiry.isRead ? "Mark Unread" : "Mark Read"}
                  </button>
                  <button
                    className={`btn btn-sm ${enquiry.isResolved ? "btn-secondary" : "btn-success"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleResolved(enquiry._id);
                    }}
                  >
                    {enquiry.isResolved ? "Mark Pending" : "Mark Resolved"}
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(enquiry._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No enquiries found</p>
        )}
      </div>
    </AdminLayout>
  );
}
