import PageHero from "../components/PageHero.jsx";

const norms = [
  { icon: "🧤", title: "Hygienic Milking", text: "Udder cleaning before milking, clean stainless-steel cans, and gloves & caps for all handlers." },
  { icon: "🧪", title: "Quality Testing", text: "Every can tested for fat, SNF, temperature and common adulterants (water, urea, starch, detergent)." },
  { icon: "❄️", title: "Cold Chain", text: "Milk chilled to 4°C within minutes and kept cold through processing, storage and delivery." },
  { icon: "🔥", title: "Pasteurisation", text: "Milk heated to 72°C for 15 seconds (HTST) to remove harmful bacteria while keeping nutrients." },
  { icon: "🧼", title: "CIP Cleaning", text: "Clean-in-place washing and sanitising of tanks, pipes and machines after every batch." },
  { icon: "📦", title: "Sealed Packing", text: "Food-grade, tamper-proof packaging with batch number and use-by date on every pack." },
  { icon: "👨‍⚕️", title: "Healthy Animals & Staff", text: "Regular veterinary check-ups for animals and health screening for all dairy workers." },
  { icon: "📋", title: "FSSAI Standards", text: "Processes aligned with FSSAI food safety and hygiene guidelines, with daily records maintained." },
];

const steps = [
  { icon: "🐄", title: "Healthy Farms", text: "Well-fed cows & buffaloes, clean sheds, green fodder and clean drinking water." },
  { icon: "🪣", title: "Clean Collection", text: "Milk filtered and collected in steel cans at village collection centres." },
  { icon: "🔬", title: "Instant Testing", text: "On-the-spot quality tests before milk is accepted." },
  { icon: "🏭", title: "Processing", text: "Chilling, pasteurisation and hygienic production of by-products." },
  { icon: "🚚", title: "Cold Delivery", text: "Insulated vans deliver to homes & shops early every morning." },
  { icon: "🍽️", title: "Your Table", text: "Fresh, safe and delicious — exactly as nature intended." },
];

export default function Quality() {
  return (
    <>
      <PageHero
        eyebrow="Quality & Hygiene"
        title="Safety in Every Drop"
        subtitle="We follow strict safety and hygiene norms at every stage — from the farm to your table."
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Standards</span>
            <h2>Safety & Hygiene Norms We Follow</h2>
            <div className="divider"><span>◆</span></div>
          </div>
          <div className="grid-4">
            {norms.map((n) => (
              <div key={n.title} className="feature-card">
                <div className="feature-icon">{n.icon}</div>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Fresh From Farm to Table</span>
            <h2>How Your Milk Reaches You</h2>
            <div className="divider"><span>◆</span></div>
          </div>
          <div className="timeline">
            {steps.map((s, i) => (
              <div key={s.title} className="timeline-item">
                <div className="timeline-dot">{s.icon}</div>
                <div className="timeline-body">
                  <span className="timeline-step">Step {i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container promise">
          <h2>Our Purity Promise</h2>
          <div className="promise-list">
            <span>✗ No Preservatives</span>
            <span>✗ No Added Water</span>
            <span>✗ No Artificial Colour</span>
            <span>✗ No Chemicals</span>
            <span className="yes">✓ 100% Natural</span>
          </div>
        </div>
      </section>
    </>
  );
}
