import { Link } from "react-router-dom";
import { COMPANY } from "../data/company.js";
import Icon from "../components/Icon.jsx";

const highlights = [
  { icon: "farm", title: "Farm Fresh", text: "Milk collected twice daily from local farmers of Valsang and nearby villages." },
  { icon: "chill", title: "Chilled in Minutes", text: "Bulk milk chillers bring milk down to 4°C right after collection." },
  { icon: "lab", title: "Lab Tested", text: "Every batch checked for fat, SNF, adulteration and freshness." },
  { icon: "delivery", title: "Delivered Daily", text: "From our dairy to your doorstep in Solapur by early morning." },
];

const featured = [
  { icon: "milk", name: "Fresh Milk", mr: "दूध" },
  { icon: "dahi", name: "Dahi", mr: "दही" },
  { icon: "chaas", name: "Chaas", mr: "ताक" },
  { icon: "lassi", name: "Lassi", mr: "लस्सी" },
  { icon: "ghee", name: "Ghee", mr: "तूप" },
  { icon: "shrikhand", name: "Shrikhand", mr: "श्रीखंड" },
];

const journey = [
  { step: "01", title: "Farm", text: "Healthy, well-fed cows & buffaloes milked hygienically." },
  { step: "02", title: "Collection", text: "Tested at the village centre and chilled instantly." },
  { step: "03", title: "Processing", text: "Pasteurised and packed in our clean, sealed plant." },
  { step: "04", title: "Your Table", text: "Delivered fresh in cold-chain vans every morning." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <span className="eyebrow">Estd. {COMPANY.since} · Valsang, Solapur</span>
            <h1>
              Pure Milk.<br />
              <span className="accent">Fresh</span> from Farm<br />to Your Table.
            </h1>
            <p className="marathi-big">{COMPANY.marathi}</p>
            <p>
              Maharashtra Dairy brings you wholesome cow and buffalo milk and
              traditional dairy products — dahi, chaas, lassi, malai, ghee and more —
              made with care under strict hygiene and safety norms.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">Explore Products</Link>
              <Link to="/contact" className="btn btn-outline">Order / Enquire</Link>
            </div>
          </div>
          <div className="hero-badge">
            <div className="badge-ring">
              <img src="/logo-emblem.png" alt="Maharashtra Dairy emblem" />
            </div>
          </div>
        </div>
        <svg className="hills" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,80 C200,20 380,110 640,60 C900,10 1120,100 1440,50 L1440,120 L0,120 Z" />
        </svg>
      </section>

      {/* HIGHLIGHTS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why Maharashtra Dairy</span>
            <h2>Purity You Can Taste</h2>
            <div className="divider"><span>◆</span></div>
          </div>
          <div className="grid-4">
            {highlights.map((h) => (
              <div key={h.title} className="feature-card">
                <div className="feature-icon"><Icon name={h.icon} /></div>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section section-cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Range</span>
            <h2>Milk & Traditional By-Products</h2>
            <div className="divider"><span>◆</span></div>
          </div>
          <div className="chip-grid">
            {featured.map((f) => (
              <Link to="/products" key={f.name} className="chip-card">
                <span className="chip-emoji"><Icon name={f.icon} size={34} /></span>
                <strong>{f.name}</strong>
                <small>{f.mr}</small>
              </Link>
            ))}
          </div>
          <div className="center mt">
            <Link to="/products" className="btn btn-primary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* FARM TO TABLE */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Farm to Table</span>
            <h2>The Journey of Every Drop</h2>
            <div className="divider"><span>◆</span></div>
          </div>
          <div className="journey">
            {journey.map((j) => (
              <div key={j.step} className="journey-step">
                <div className="journey-num">{j.step}</div>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta-inner">
          <div>
            <h2>Start your mornings with Maharashtra Dairy</h2>
            <p>Daily milk subscription and bulk orders for hotels, sweet shops & events.</p>
          </div>
          <a href={`tel:${COMPANY.phoneLink}`} className="btn btn-light">📞 Call {COMPANY.phone}</a>
        </div>
      </section>
    </>
  );
}
