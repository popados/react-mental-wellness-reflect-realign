import { useEffect, useRef, useState } from "react";
import {
  addDays,
  dateKey,
  fmtWeekRange,
  parseKey,
  startOfWeek,
} from "../utils/dates";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function monthWeeks(month) {
  const first = startOfWeek(month);
  const weeks = [];
  for (let w = first; w.getMonth() === month.getMonth() || w < month; w = addDays(w, 7)) {
    weeks.push(Array.from({ length: 7 }, (_, i) => addDays(w, i)));
  }
  return weeks;
}

export default function WeekPicker({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => {
    const s = parseKey(value);
    return new Date(s.getFullYear(), s.getMonth(), 1);
  });
  const ref = useRef(null);

  const thisWeek = dateKey(startOfWeek());
  const todayKey = dateKey();
  const canNext = value < thisWeek;

  useEffect(() => {
    if (!open) return;
    function onDown(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggleOpen() {
    if (!open) {
      const s = parseKey(value);
      setMonth(new Date(s.getFullYear(), s.getMonth(), 1));
    }
    setOpen((o) => !o);
  }

  function step(n) {
    onChange(dateKey(addDays(parseKey(value), 7 * n)));
  }

  function choose(key) {
    onChange(key);
    setOpen(false);
  }

  const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
  const canNextMonth = dateKey(startOfWeek(nextMonth)) <= thisWeek;

  return (
    <div className="week-picker" ref={ref}>
      {label && <div className="wp-caption">{label}</div>}
      <div className="wp-bar">
        <button className="wp-step" onClick={() => step(-1)} aria-label="Previous week">
          ‹
        </button>
        <button className="wp-label" onClick={toggleOpen} aria-expanded={open}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
            <path d="M3.5 10h17M8 3v4M16 3v4" />
          </svg>
          <span>{fmtWeekRange(value)}</span>
          {value === thisWeek && <span className="wp-tag">This week</span>}
        </button>
        <button
          className="wp-step"
          onClick={() => step(1)}
          disabled={!canNext}
          aria-label="Next week"
        >
          ›
        </button>
      </div>

      {open && (
        <div className="wp-pop" role="dialog" aria-label="Choose a week">
          <div className="wp-month">
            <button
              className="wp-step"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
              aria-label="Previous month"
            >
              ‹
            </button>
            <span>
              {month.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </span>
            <button
              className="wp-step"
              onClick={() => setMonth(nextMonth)}
              disabled={!canNextMonth}
              aria-label="Next month"
            >
              ›
            </button>
          </div>
          <div className="wp-grid-head">
            {WEEKDAYS.map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          {monthWeeks(month).map((days) => {
            const key = dateKey(days[0]);
            const future = key > thisWeek;
            return (
              <button
                key={key}
                className={`wp-week${key === value ? " sel" : ""}`}
                disabled={future}
                onClick={() => choose(key)}
                aria-label={`Week of ${fmtWeekRange(key)}`}
              >
                {days.map((d) => (
                  <span
                    key={dateKey(d)}
                    className={`${d.getMonth() !== month.getMonth() ? "out" : ""}${
                      dateKey(d) === todayKey ? " today" : ""
                    }`}
                  >
                    {d.getDate()}
                  </span>
                ))}
              </button>
            );
          })}
          <button className="wp-this" onClick={() => choose(thisWeek)}>
            Jump to this week
          </button>
        </div>
      )}
    </div>
  );
}
