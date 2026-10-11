import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProductById } from "../features/products/productsSlice";
import FavoriteButton from "../components/FavoriteButton";
import ProductImage from "../components/ProductImage";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function ProductDetailsPage() {
  const { id } = useParams(); // dynamic segment from /products/:id
  const dispatch = useDispatch();
  const { selected, detailStatus, detailError } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(loadProductById(id));
  }, [id, dispatch]);

  if (detailStatus === "idle" || detailStatus === "loading") {
    return <Loader text="Loading product..." />;
  }
  if (detailStatus === "failed" || !selected) {
    return (
      <ErrorMessage
        message={detailError || "Product not found"}
        onRetry={() => dispatch(loadProductById(id))}
      />
    );
  }

  return (
    <section>
      <Link to="/products" className="back-link">← Back to products</Link>
      <div className="details">
        <div className="details-img">
          <ProductImage src={selected.images[0] || selected.thumbnail} alt={selected.title} />
        </div>
        <div className="details-info">
          <span className="tag">{selected.category}</span>
          <h2>{selected.title}</h2>
          {selected.brand && <p className="muted">by {selected.brand}</p>}
          <p>{selected.description}</p>
          <p className="details-price">
            ${selected.price}{" "}
            {selected.discountPercentage > 0 && <small>({selected.discountPercentage}% off)</small>}
          </p>
          <p className="muted">
            {selected.rating > 0 && <>★ {selected.rating}</>}
            {selected.stock !== null && <> · {selected.stock} in stock</>}
          </p>
          <FavoriteButton product={selected} />
        </div>
      </div>
    </section>
  );
}
