import Icon, { productIcon } from "./Icon.jsx";

export default function ProductCard({ p }) {
  return (
    <article className="product-card">
      <div className="product-icon"><Icon name={productIcon(p.name)} size={30} /></div>
      <h3>{p.name}</h3>
      {p.marathiName && <div className="marathi">{p.marathiName}</div>}
      <p>{p.description}</p>
      {p.benefits?.length > 0 && (
        <ul className="benefits">
          {p.benefits.map((b) => <li key={b}>✓ {b}</li>)}
        </ul>
      )}
    </article>
  );
}
