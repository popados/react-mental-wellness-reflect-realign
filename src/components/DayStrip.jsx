import { parseKey } from "../utils/dates";

export default function DayStrip({ days }) {
  return (
    <div className="day-strip">
      {days.map((d) => {
        const date = parseKey(d.key).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        });
        return (
          <span
            key={d.key}
            className={`day-cell${d.color ? " on" : ""}`}
            style={d.color ? { background: d.color } : undefined}
            title={d.label ? `${date} · ${d.label}` : `${date} · nothing logged`}
          />
        );
      })}
    </div>
  );
}
