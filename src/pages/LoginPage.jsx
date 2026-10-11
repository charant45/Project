import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, loginUser } from "../features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authError = useSelector((state) => state.auth.error);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  // Clear any leftover error from a previous attempt when the page opens
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  // Already logged in (or just logged in): go to products, or wherever they were headed
  useEffect(() => {
    if (currentUser) {
      const destination = location.state?.from?.pathname || "/products";
      navigate(destination, { replace: true });
    }
  }, [currentUser, navigate, location]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile)) {
      setFormError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return;
    }
    setFormError("");
    dispatch(loginUser({ mobile, password }));
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🛍️</div>
        <h1>Welcome back</h1>
        <p className="muted">Log in with your mobile number to continue</p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="mobile">Mobile number</label>
          <input
            id="mobile"
            className="input"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="9876543210"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {(formError || authError) && <p className="auth-error">{formError || authError}</p>}

          <button type="submit" className="btn btn-primary auth-submit">
            Log in
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
