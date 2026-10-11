import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";
import HighlightText from "./HighlightText";
import ProductImage from "./ProductImage";

export default function ProductCard({ product, query = "" }) {
  return (
    <article className="card">
      <Link to={`/products/${product.id}`} className="card-link">
        <div className="card-img">
          <ProductImage src={product.thumbnail} alt={product.title} />
          {product.discountPercentage > 0 && (
            <span className="discount">-{Math.round(product.discountPercentage)}%</span>
          )}
        </div>
        <h3 className="card-title">
          <HighlightText text={product.title} query={query} />
        </h3>
      </Link>
      <span className="tag">{product.category}</span>
      <div className="card-meta">
        <span className="price">${product.price}</span>
        {product.rating > 0 && <span className="rating">★ {product.rating}</span>}
      </div>
      <div className="card-actions">
        <FavoriteButton product={product} />
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
