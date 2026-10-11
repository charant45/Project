export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <span className="search-icon" aria-hidden="true">🔍</span>
      <input
        className="search-input"
        type="text"
        placeholder="Search by name, brand or category..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search products"
      />
      {value && (
        <button className="search-clear" onClick={() => onChange("")} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  );
}
