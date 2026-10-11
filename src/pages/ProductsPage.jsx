import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  loadProducts,
  selectCategories,
  selectFilteredProducts,
  setCategory,
  setSearch,
} from "../features/products/productsSlice";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import SkeletonGrid from "../components/SkeletonGrid";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { status, error, search, category } = useSelector((state) => state.products);
  const products = useSelector(selectFilteredProducts);
  const categories = useSelector(selectCategories);

  // Fetch once; later visits reuse the data already in the store
  useEffect(() => {
    if (status === "idle") dispatch(loadProducts());
  }, [status, dispatch]);

  return (
    <>
      <h2 className="page-title">Browse products</h2>
      <div className="filters">
        <SearchBar value={search} onChange={(v) => dispatch(setSearch(v))} />
        <CategoryFilter
          categories={categories}
          value={category}
          onChange={(v) => dispatch(setCategory(v))}
        />
      </div>

      {status === "loading" && <SkeletonGrid />}

      {status === "failed" && (
        <ErrorMessage message={error} onRetry={() => dispatch(loadProducts())} />
      )}

      {status === "succeeded" && products.length === 0 && (
        <EmptyState icon="🔍" message={search.trim() ? `No products found for "${search.trim()}".` : "No products found."}>
          <button className="btn" onClick={() => dispatch(clearFilters())}>
            Clear filters
          </button>
        </EmptyState>
      )}

      {status === "succeeded" && products.length > 0 && (
        <>
          <p className="results-info">
            {search.trim() ? (
              <>Showing <strong>{products.length}</strong> result{products.length === 1 ? "" : "s"} for &ldquo;{search.trim()}&rdquo;</>
            ) : (
              <><strong>{products.length}</strong> products</>
            )}
            {category !== "all" && <> in <strong>{category}</strong></>}
          </p>
          <div className="grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} query={search} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
