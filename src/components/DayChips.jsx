import { ALL_DAYS, DAY_NAMES } from "../utils/habits";

const PRESETS = [
  { label: "Every day", days: ALL_DAYS },
  { label: "Weekdays", days: [1, 2, 3, 4, 5] },
  { label: "Weekends", days: [0, 6] },
];

const same = (a, b) => [...a].sort().join() === [...b].sort().join();

export default function DayChips({ value, onChange }) {
  function toggle(d) {
    if (value.includes(d)) {
      if (value.length > 1) onChange(value.filter((x) => x !== d));
    } else {
      onChange([...value, d].sort());
    }
  }

  return (
    <div className="day-chips">
      <div className="tp-row">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            className={`chip-plain tp-chip${same(value, p.days) ? " on" : ""}`}
            onClick={() => onChange(p.days)}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="day-chip-row">
        {DAY_NAMES.map((name, d) => (
          <button
            key={name}
            type="button"
            className={`day-chip${value.includes(d) ? " on" : ""}`}
            onClick={() => toggle(d)}
            aria-pressed={value.includes(d)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
