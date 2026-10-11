import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, selectIsInCart } from "../features/cart/cartSlice";

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();
  const inCart = useSelector(selectIsInCart(product.id));

  function handleClick() {
    if (inCart) dispatch(removeFromCart(product.id));
    else dispatch(addToCart(product));
  }

  return (
    <button className={`btn cart-btn ${inCart ? "active" : ""}`} onClick={handleClick}>
      {inCart ? "✓ In cart" : "🛒 Add to cart"}
    </button>
  );
}
