export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state state-error" role="alert">
      <div className="state-icon">⚠️</div>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
