# Product Explorer

A product browsing app built with React (Vite, JavaScript), React Router, Redux Toolkit and the DummyJSON REST API.

## Features
- Login and register with mobile number + password (/login, /register)
- Product list with search and category filter (/products)
- Product details page with dynamic routing (/products/:id)
- Favorites page: add and remove products (/favorites), saved in localStorage
- Cart page: add/remove products, adjust quantity, running total (/cart), saved in localStorage
- Loading, error (with retry) and empty states
- Reusable components and a responsive layout in plain CSS

## Setup
Requires Node.js 18 or newer.

```bash
git clone <your-repo-url>
cd product-explorer
npm install
npm run dev
```
Open http://localhost:5173

Other commands: `npm run build` (production build), `npm run preview` (serve the build).

## Project structure
```
src/
  api/          HTTP calls to the products API
  app/          Redux store
  features/     Redux slices (products, favorites, auth, cart)
  components/   Reusable UI components (incl. RequireAuth route guard)
  pages/        Route-level pages (Login, Register, Products, Details, Favorites)
```

## Login and register
/products, /products/:id and /favorites all require login; visiting them while
logged out redirects to /login. Register with any 10-digit mobile number and a
password of 6+ characters, which logs you in immediately. Logging in again
later needs the same mobile number and password.

**Note:** this app has no backend, so accounts and the session are stored in
the browser's localStorage (see `src/features/auth/authSlice.js`) purely to
demonstrate the login/register flow. Passwords are not encrypted; don't reuse
a real password here, and don't use this approach for a real login system.

## Design decisions
- All products are fetched once; search and category filtering use a memoized selector.
- Search text and selected category live in Redux, so filters are kept when navigating back.
- Favorites store the full product object, so the favorites page needs no extra request.

## API
Products are loaded from `https://api.mydummyapi.com/categories/products`. To use a different endpoint, and set `VITE_PRODUCTS_URL` to the full products URL, then restart `npm run dev`.
`src/api/productsApi.js` converts the API response into one consistent product shape (title/name, image/thumbnail, and so on), so if the API uses different field names only that file needs a change.
