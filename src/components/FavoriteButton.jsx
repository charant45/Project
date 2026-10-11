import { useDispatch, useSelector } from "react-redux";
import { selectIsFavorite, toggleFavorite } from "../features/favorites/favoritesSlice";

export default function FavoriteButton({ product }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(product.id));

  return (
    <button
      className={`btn fav-btn ${isFavorite ? "active" : ""}`}
      aria-pressed={isFavorite}
      onClick={() => dispatch(toggleFavorite(product))}
    >
      {isFavorite ? "♥ Remove favorite" : "♡ Add to favorites"}
    </button>
  );
}
