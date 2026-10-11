export default function EmptyState({ icon = "📭", message, children }) {
  return (
    <div className="state">
      <div className="state-icon">{icon}</div>
      <p>{message}</p>
      {children}
    </div>
  );
}
