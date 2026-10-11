const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL ;

function toList(data) {
  if (Array.isArray(data)) return data;
  for (const key of ["products", "data", "items", "results"]) {
    if (Array.isArray(data?.[key])) return data[key];
  }
  return [];
}

function normalize(raw, index) {
  const cat = typeof raw.category === "object" ? raw.category?.name : raw.category;
  const images = Array.isArray(raw.images) ? raw.images : raw.image ? [raw.image] : [];
  const thumbnail = raw.thumbnail || raw.image || raw.imageUrl || raw.image_url || images[0] || "";
  return {
    id: raw.id ?? raw._id ?? raw.productId ?? index + 1,
    title: String(raw.title || raw.name || raw.productName || "Untitled product"),
    description: raw.description || "",
    category: String(cat || "general"),
    brand: raw.brand || "",
    price: Number(raw.price ?? 0),
    discountPercentage: Number(raw.discountPercentage ?? raw.discount ?? 0),
    rating: Number(raw.rating?.rate ?? raw.rating ?? 0),
    stock: raw.stock ?? raw.quantity ?? null,
    thumbnail,
    images: images.length ? images : thumbnail ? [thumbnail] : [],
  };
}

export async function fetchAllProducts() {
  let res;
  try {
    res = await fetch(PRODUCTS_URL);
  } catch {
    throw new Error("Could not reach the API. Check your internet connection.");
  }
  if (!res.ok) throw new Error(`Could not load products (HTTP ${res.status}) at ${PRODUCTS_URL}`);
  return toList(await res.json()).map(normalize);
}
