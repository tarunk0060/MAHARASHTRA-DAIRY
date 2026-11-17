const API_BASE = "/api/admin";

function getHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Products
export async function fetchAdminProducts(token, { search, category } = {}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const res = await fetch(`${API_BASE}/products?${params}`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchAdminProductStats(token) {
  const res = await fetch(`${API_BASE}/products/stats`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch product stats");
  return res.json();
}

export async function createProduct(token, productData) {
  const res = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

export async function updateProduct(token, id, productData) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function deleteProduct(token, id) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}

// Contacts
export async function fetchAdminContacts(token, { search, resolved } = {}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (resolved !== undefined) params.append("resolved", resolved);

  const res = await fetch(`${API_BASE}/contacts?${params}`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
}

export async function fetchAdminContactStats(token) {
  const res = await fetch(`${API_BASE}/contacts/stats`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch contact stats");
  return res.json();
}

export async function getContactById(token, id) {
  const res = await fetch(`${API_BASE}/contacts/${id}`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch contact");
  return res.json();
}

export async function updateContact(token, id, data) {
  const res = await fetch(`${API_BASE}/contacts/${id}`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update contact");
  return res.json();
}

export async function deleteContact(token, id) {
  const res = await fetch(`${API_BASE}/contacts/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to delete contact");
  return res.json();
}

// Content
export async function fetchSiteContent(token) {
  const res = await fetch(`${API_BASE}/content`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch content");
  return res.json();
}

export async function getContentBySection(token, section) {
  const res = await fetch(`${API_BASE}/content/${section}`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch content");
  return res.json();
}

export async function updateContent(token, section, content) {
  const res = await fetch(`${API_BASE}/content/${section}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Failed to update content");
  return res.json();
}

// Dashboard
export async function fetchDashboardStats(token) {
  try {
    const [products, contacts] = await Promise.all([
      fetchAdminProductStats(token),
      fetchAdminContactStats(token),
    ]);
    return { ...products, ...contacts };
  } catch (err) {
    throw new Error("Failed to fetch dashboard stats");
  }
}
