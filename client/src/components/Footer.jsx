import { Link } from "react-router-dom";
import { COMPANY } from "../data/company.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="rope" />
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <img src="/logo.png" alt="" />
            <div>
              <strong>MAHARASHTRA DAIRY</strong>
              <small>{COMPANY.marathi}</small>
            </div>
          </div>
          <p>Fresh from farm to table — pure milk and traditional dairy products from the villages of Solapur.</p>
          <p className="tagline">{COMPANY.tagline}</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/quality">Quality & Hygiene</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Our Products</h4>
          <ul>
            <li>Cow & Buffalo Milk</li>
            <li>Dahi (Curd) & Shrikhand</li>
            <li>Chaas & Lassi</li>
            <li>Malai, Butter & Ghee</li>
            <li>Fresh Paneer</li>
          </ul>
        </div>

        <div>
          <h4>Reach Us</h4>
          <ul className="contact-list">
            <li>📍 {COMPANY.address.join(", ")}</li>
            <li>📞 <a href={`tel:${COMPANY.phoneLink}`}>{COMPANY.phone}</a></li>
            <li>✉️ <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Maharashtra Dairy, Solapur · Estd. {COMPANY.since}
      </div>
    </footer>
  );
}
