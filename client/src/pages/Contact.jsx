import { useState } from "react";
import PageHero from "../components/PageHero.jsx";
import { COMPANY } from "../data/company.js";

const empty = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Something went wrong.");
      setStatus({ type: "success", msg: data.message });
      setForm(empty);
    } catch (err) {
      setStatus({
        type: "error",
        msg: `${err.message} You can also reach us at ${COMPANY.phone}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We'd Love to Hear From You"
        subtitle="Daily milk subscriptions, bulk orders, dealership enquiries or feedback — get in touch."
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <div>
                <h3>Our Location</h3>
                <p><strong>{COMPANY.name}</strong></p>
                {COMPANY.address.map((l) => <p key={l}>{l}</p>)}
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">📞</div>
              <div>
                <h3>Call Us</h3>
                <p><a href={`tel:${COMPANY.phoneLink}`}>{COMPANY.phone}</a></p>
                <p className="muted">Mon – Sun, 6:00 AM – 9:00 PM</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">✉️</div>
              <div>
                <h3>Email Us</h3>
                <p><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
                <p className="muted">We reply within 24 hours</p>
              </div>
            </div>
            <a
              className="btn btn-whatsapp"
              href={`https://wa.me/${COMPANY.phoneLink.replace("+", "")}`}
              target="_blank"
              rel="noreferrer"
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <h2>Send us a Message</h2>
            <div className="form-row">
              <label>
                Full Name *
                <input name="name" value={form.name} onChange={onChange} required />
              </label>
              <label>
                Mobile Number
                <input name="phone" value={form.phone} onChange={onChange} type="tel" />
              </label>
            </div>
            <label>
              Email *
              <input name="email" value={form.email} onChange={onChange} type="email" required />
            </label>
            <label>
              Subject
              <select name="subject" value={form.subject} onChange={onChange}>
                <option value="">Select a topic</option>
                <option>Daily Milk Subscription</option>
                <option>Bulk / Event Order</option>
                <option>Dealership / Distribution</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Message *
              <textarea name="message" rows="5" value={form.message} onChange={onChange} required />
            </label>
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
            {status.msg && <div className={`alert ${status.type}`}>{status.msg}</div>}
          </form>
        </div>
      </section>

      <section className="map-wrap">
        <iframe
          title="Maharashtra Dairy location"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(COMPANY.mapQuery)}&z=12&output=embed`}
          loading="lazy"
        />
      </section>
    </>
  );
}
