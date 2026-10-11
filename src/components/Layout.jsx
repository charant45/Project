import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { selectCartCount } from "../features/cart/cartSlice";

export default function Layout() {
  const count = useSelector((state) => state.favorites.items.length);
  const cartCount = useSelector(selectCartCount);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login", { replace: true });
  }

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <NavLink to="/products" className="brand">🛍️ Product Explorer</NavLink>
          <nav className="nav">
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/favorites">
              Favorites <span className="badge">{count}</span>
            </NavLink>
            <NavLink to="/cart">
              Cart <span className="badge">{cartCount}</span>
            </NavLink>
            {currentUser && <span className="nav-user">{currentUser.mobile}</span>}
            <button className="btn nav-logout" onClick={handleLogout}>
              Log out
            </button>
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
