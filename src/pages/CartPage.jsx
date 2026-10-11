import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectCartTotal,
} from "../features/cart/cartSlice";
import ProductImage from "../components/ProductImage";
import EmptyState from "../components/EmptyState";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <EmptyState icon="🛒" message="Your cart is empty.">
        <Link to="/products" className="btn btn-primary">Browse products</Link>
      </EmptyState>
    );
  }

  return (
    <>
      <h2 className="page-title">Your cart ({items.length})</h2>
      <div className="cart-list">
        {items.map((item) => (
          <div className="cart-row" key={item.id}>
            <Link to={`/products/${item.id}`} className="cart-row-img">
              <ProductImage src={item.thumbnail} alt={item.title} />
            </Link>

            <div className="cart-row-info">
              <Link to={`/products/${item.id}`} className="cart-row-title">{item.title}</Link>
              <span className="muted">${item.price} each</span>
            </div>

            <div className="qty-stepper">
              <button onClick={() => dispatch(decrementQuantity(item.id))} aria-label="Decrease quantity">−</button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(incrementQuantity(item.id))} aria-label="Increase quantity">+</button>
            </div>

            <span className="cart-row-subtotal">${(item.price * item.quantity).toFixed(2)}</span>

            <button
              className="cart-remove"
              onClick={() => dispatch(removeFromCart(item.id))}
              aria-label={`Remove ${item.title} from cart`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <span className="muted">Total</span>
        <strong>${total.toFixed(2)}</strong>
      </div>
    </>
  );
}
