import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";

export default function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites.items);

  if (favorites.length === 0) {
    return (
      <EmptyState icon="💔" message="You have no favorites yet.">
        <Link to="/products" className="btn btn-primary">Browse products</Link>
      </EmptyState>
    );
  }

  return (
    <>
      <h2 className="page-title">Your favorites ({favorites.length})</h2>
      <div className="grid">
        {favorites.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
