// Minimal line icons (24×24, stroke uses currentColor)
const paths = {
  farm: (
    <>
      <path d="M12 21V8" />
      <path d="M12 12c-3 0-5-2-5-5 3 0 5 2 5 5Z" />
      <path d="M12 12c3 0 5-2 5-5-3 0-5 2-5 5Z" />
      <path d="M12 17c-3 0-5-2-5-5 3 0 5 2 5 5Z" />
      <path d="M12 17c3 0 5-2 5-5-3 0-5 2-5 5Z" />
      <path d="M12 8V3" />
    </>
  ),
  chill: (
    <>
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" />
      <path d="m9 3 3 3 3-3M9 21l3-3 3 3M3 9l3 3-3 3M21 9l-3 3 3 3" />
    </>
  ),
  lab: (
    <>
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  delivery: (
    <>
      <path d="M2 6h11v10H2zM13 9h4l4 4v3h-8" />
      <circle cx="6" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  milk: (
    <>
      <path d="M9 2h6M9.5 2v3L7 9v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9l-2.5-4V2" />
      <path d="M7 13h10" />
    </>
  ),
  dahi: (
    <>
      <path d="M3 11h18a9 9 0 0 1-18 0Z" />
      <path d="M8 21h8M8 7c0-1.5 1-2 2-2M13 7c0-1.5 1-2 2-2" />
    </>
  ),
  chaas: (
    <>
      <path d="M6 4h12l-1.5 16a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2Z" />
      <path d="M6.6 10h10.8" />
    </>
  ),
  lassi: (
    <>
      <path d="M7 7h10l-1 13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z" />
      <path d="M14 7l2-5h3" />
      <path d="M7.4 12h9.2" />
    </>
  ),
  ghee: (
    <>
      <path d="M7 6h10v2a2 2 0 0 1 1 1.7V19a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9.7A2 2 0 0 1 7 8Z" />
      <path d="M6 3h12v3H6zM9 13h6" />
    </>
  ),
  shrikhand: (
    <>
      <path d="M4 12h16l-2 7a3 3 0 0 1-3 2H9a3 3 0 0 1-3-2Z" />
      <path d="M6 12a6 6 0 0 1 12 0M12 6V4" />
    </>
  ),
  can: (
    <>
      <path d="M8 2h8M9 2v3l-3 3v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8l-3-3V2" />
      <path d="M6 12h12M6 16h12" />
    </>
  ),
  carton: (
    <>
      <path d="M8 2h8v3l2 3v14H6V8l2-3Z" />
      <path d="M6 8h12M10 13a2 2 0 0 0 4 0c0-1.5-2-3.5-2-3.5S10 11.5 10 13Z" />
    </>
  ),
  cream: (
    <>
      <path d="M7 6h10l-1 14a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z" />
      <path d="M17 9h1.5a2 2 0 0 1 0 4H16.7M7 6l-2-2" />
      <path d="M7.4 11c1.5 1 3 1 4.6 0s3.1-1 4.6 0" />
    </>
  ),
  butter: (
    <>
      <path d="M3 15l4-6h14l-4 6Z" />
      <path d="M3 15v3h14v-3M17 18l4-6V9" />
    </>
  ),
  paneer: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </>
  ),
};

// Picks an icon from a product's name (works for API and built-in data)
export function productIcon(name = "") {
  const n = name.toLowerCase();
  if (n.includes("buffalo")) return "can";
  if (n.includes("toned")) return "carton";
  if (n.includes("dahi") || n.includes("curd")) return "dahi";
  if (n.includes("cream") && !n.includes("full cream")) return "cream";
  if (n.includes("chaas") || n.includes("buttermilk")) return "chaas";
  if (n.includes("lassi")) return "lassi";
  if (n.includes("ghee")) return "ghee";
  if (n.includes("butter")) return "butter";
  if (n.includes("paneer")) return "paneer";
  if (n.includes("shrikhand")) return "shrikhand";
  return "milk";
}

export default function Icon({ name, size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
