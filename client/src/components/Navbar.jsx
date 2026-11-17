import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { COMPANY } from "../data/company.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/quality", label: "Quality & Hygiene" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="topbar">
        <div className="container topbar-inner">
          <span>📍 Valsang, Solapur, Maharashtra</span>
          <span>
            <a href={`tel:${COMPANY.phoneLink}`}>📞 {COMPANY.phone}</a>
            <a href={`mailto:${COMPANY.email}`}>✉️ {COMPANY.email}</a>
          </span>
        </div>
      </div>
      <nav className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Maharashtra Dairy logo" />
          <div>
            <strong>MAHARASHTRA DAIRY</strong>
            <small>{COMPANY.marathi}</small>
          </div>
        </Link>

        <button
          className={`burger ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
