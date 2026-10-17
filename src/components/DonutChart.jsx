export default function DonutChart({ items, emptyText }) {
  const total = items.reduce((sum, c) => sum + c.count, 0);
  if (total === 0) return <div className="empty">{emptyText}</div>;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const arc = (c) => (c.count / total) * circumference;
  const segments = items.map((c, i) => ({
    ...c,
    dash: arc(c),
    offset: items.slice(0, i).reduce((sum, x) => sum + arc(x), 0),
  }));

  return (
    <div className="pie-chart-wrap">
      <svg viewBox="0 0 160 160" className="pie-chart">
        <g transform="rotate(-90 80 80)">
          {segments.map((s) => (
            <circle
              key={s.name}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth="24"
              strokeDasharray={`${s.dash} ${circumference - s.dash}`}
              strokeDashoffset={-s.offset}
            />
          ))}
        </g>
      </svg>
      <div className="pie-legend">
        {segments.map((s) => (
          <div className="pie-legend-item" key={s.name}>
            <span className="pie-swatch" style={{ background: s.color }} />
            {s.name} · {s.count}
          </div>
        ))}
      </div>
    </div>
  );
}
