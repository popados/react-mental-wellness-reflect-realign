export default function BarList({ items, emptyText }) {
  const max = Math.max(0, ...items.map((i) => i.count));
  if (max === 0) return <div className="empty">{emptyText}</div>;

  return (
    <div className="bar-list">
      {items.map((i) => (
        <div className="bar-row" key={i.name}>
          <span className="bar-name">{i.name}</span>
          <span className="bar-track">
            <span
              className="bar-fill"
              style={{ width: `${(i.count / max) * 100}%`, background: i.color }}
            />
          </span>
          <span className="bar-count">{i.count}</span>
        </div>
      ))}
    </div>
  );
}
