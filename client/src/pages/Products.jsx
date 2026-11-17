import { useEffect, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import fallbackProducts from "../data/products.js";

const tabs = [
  { key: "all", label: "All Products" },
  { key: "milk", label: "Milk" },
  { key: "byproduct", label: "Milk By-Products" },
];

export default function Products() {
  const [products, setProducts] = useState(fallbackProducts);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => Array.isArray(data) && data.length && setProducts(data))
      .catch(() => {}); // keep built-in data if API is offline
  }, []);

  const milk = products.filter((p) => p.category === "milk");
  const byproducts = products.filter((p) => p.category === "byproduct");

  return (
    <>
      <PageHero
        eyebrow="Dairy Products"
        title="Fresh Milk & Traditional Delights"
        subtitle="Everything made from the same pure, farm-fresh milk — with no preservatives and no shortcuts."
      />

      <section className="section">
        <div className="container">
          <div className="tabs">
            {tabs.map((t) => (
              <button
                key={t.key}
                className={tab === t.key ? "active" : ""}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {(tab === "all" || tab === "milk") && (
            <>
              <div className="section-head left">
                <h2>Fresh Milk</h2>
                <p>Pasteurised, chilled and delivered within hours of milking.</p>
              </div>
              <div className="product-grid">
                {milk.map((p) => <ProductCard key={p.name} p={p} />)}
              </div>
            </>
          )}

          {(tab === "all" || tab === "byproduct") && (
            <>
              <div className="section-head left mt">
                <h2>Milk By-Products</h2>
                <p>Curd, cream, buttermilk, lassi, ghee and more — made fresh in small batches.</p>
              </div>
              <div className="product-grid">
                {byproducts.map((p) => <ProductCard key={p.name} p={p} />)}
              </div>
            </>
          )}

          <p className="note">Contact us for prices, daily subscriptions and bulk orders.</p>
        </div>
      </section>
    </>
  );
}
