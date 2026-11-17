import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";
import { fetchSiteContent, updateContent } from "../services/adminApi.js";

const sections = [
  { id: "home", label: "Home Page" },
  { id: "about", label: "About Us" },
  { id: "quality", label: "Quality & Hygiene" },
  { id: "contact", label: "Contact Information" },
];

export default function AdminContent() {
  const { token } = useAdminAuth();
  const [contents, setContents] = useState({});
  const [activeSection, setActiveSection] = useState("home");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchSiteContent(token);
        const contentMap = {};
        data.forEach((item) => {
          contentMap[item.section] = item.content || "";
        });
        setContents(contentMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [token]);

  const handleSave = async (section) => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      await updateContent(token, section, contents[section]);
      setSuccess(`${section} content updated successfully`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (section, value) => {
    setContents((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Loading content...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-content">
        <h1>Website Content Management</h1>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <div className="content-sections">
          <div className="section-tabs">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`tab ${activeSection === section.id ? "active" : ""}`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="section-content">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`content-editor ${activeSection === section.id ? "active" : ""}`}
              >
                <div className="editor-header">
                  <h2>{section.label}</h2>
                  <p className="text-muted">Edit the content for this section</p>
                </div>

                <textarea
                  value={contents[section.id] || ""}
                  onChange={(e) => handleChange(section.id, e.target.value)}
                  rows="12"
                  className="content-textarea"
                  placeholder="Enter content here..."
                />

                <div className="editor-footer">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSave(section.id)}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <p className="text-muted">
                    Last updated: {contents[section.id] ? "Now" : "Never"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
