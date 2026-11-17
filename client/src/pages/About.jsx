import PageHero from "../components/PageHero.jsx";
import { COMPANY } from "../data/company.js";

const values = [
  { icon: "🤝", title: "Farmer First", text: "Fair and timely payment to every farmer partner, building trust in our rural community." },
  { icon: "💧", title: "Purity", text: "No adulteration, no preservatives — just honest milk the way nature made it." },
  { icon: "🏺", title: "Tradition", text: "Recipes for dahi, ghee and shrikhand passed down through Maharashtrian kitchens." },
  { icon: "🌱", title: "Sustainability", text: "Responsible animal care, green fodder and minimal plastic packaging." },
];

const stats = [
  { num: "2023", label: "Year Established" },
  { num: "100%", label: "Pure & Unadulterated" },
  { num: "4°C", label: "Cold Chain Maintained" },
  { num: "Daily", label: "Fresh Delivery" },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Rooted in Solapur, Rooted in Tradition"
        subtitle="A dairy born in the village of Valsang with one promise — pure, fresh milk for every family."
      />

      <section className="section">
        <div className="container about-grid">
          <div className="about-img">
            <img src="/logo.png" alt="Maharashtra Dairy emblem" />
          </div>
          <div>
            <span className="eyebrow">Our Story</span>
            <h2>From Valsang Village to Your Home</h2>
            <p>
              <strong>{COMPANY.name}</strong> ({COMPANY.marathi}) was started in {COMPANY.since} in
              Valsang, District Solapur, with a simple idea: the milk our families grew up
              drinking — thick, fresh and honest — should be available to everyone in the city.
            </p>
            <p>
              We work directly with local dairy farmers, collect milk at village centres,
              test every can, chill it immediately and process it in a clean, modern unit.
              Alongside fresh milk, we make the traditional by-products Maharashtra loves —
              dahi, taak, lassi, malai, loni, sajuk tup, paneer and shrikhand.
            </p>
            <p>
              Our promise is printed on our emblem: <strong>Pure • Fresh • Traditional</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container grid-4">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <strong>{s.num}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What We Stand For</span>
            <h2>Our Values</h2>
            <div className="divider"><span>◆</span></div>
          </div>
          <div className="grid-4">
            {values.map((v) => (
              <div key={v.title} className="feature-card">
                <div className="feature-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container mission-grid">
          <div className="mission-card">
            <h3>🎯 Our Mission</h3>
            <p>To deliver pure, safe and nutritious dairy products to every household while ensuring a fair livelihood for local farmers.</p>
          </div>
          <div className="mission-card">
            <h3>👁️ Our Vision</h3>
            <p>To become the most trusted name in dairy across Maharashtra — known for purity, hygiene and the taste of tradition.</p>
          </div>
        </div>
      </section>
    </>
  );
}
