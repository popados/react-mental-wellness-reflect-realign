import { useEffect, useId, useRef, useState } from "react";

// Clock positions 1:00 … 11:30, then 12:00 and 12:30 last. Hour 0 stands
// for 12 on the face.
const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0];
const SLOTS = HOURS.flatMap((h) => [
  { h, m: 0 },
  { h, m: 30 },
]);

const slotKey = (s) => `${s.h}-${s.m}`;
const slotLabel = (s) => `${s.h === 0 ? 12 : s.h}:${String(s.m).padStart(2, "0")}`;

function parse(value) {
  const [h, m] = value.split(":").map(Number);
  return { h: h % 12, m, pm: h >= 12 };
}

const toValue = (h, m, pm) =>
  `${String(h + (pm ? 12 : 0)).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

export default function TimePicker({ value, onChange }) {
  const { h, m, pm } = parse(value);
  const current = SLOTS.find((s) => s.h === h && s.m === m);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(current || SLOTS[0]);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const buttonRef = useRef(null);
  const id = useId();
  const optionId = (s) => `${id}-${slotKey(s)}`;

  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    document.getElementById(optionId(active))?.scrollIntoView({ block: "center" });
    function onDown(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
    // Only on open: scrolling on every `active` change would fight the mouse.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function openList() {
    setActive(current || SLOTS[0]);
    setOpen(true);
  }

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  function choose(s) {
    onChange(toValue(s.h, s.m, pm));
    close();
  }

  function move(next) {
    setActive(next);
    document.getElementById(optionId(next))?.scrollIntoView({ block: "nearest" });
  }

  function onListKey(e) {
    const i = SLOTS.indexOf(active);
    // Two-column grid: up/down jump an hour, left/right step half an hour.
    const step = (n) => move(SLOTS[Math.min(SLOTS.length - 1, Math.max(0, i + n))]);
    const keys = {
      ArrowDown: () => step(2),
      ArrowUp: () => step(-2),
      ArrowRight: () => step(1),
      ArrowLeft: () => step(-1),
      Home: () => move(SLOTS[0]),
      End: () => move(SLOTS[SLOTS.length - 1]),
      Enter: () => choose(active),
      " ": () => choose(active),
      Escape: close,
      Tab: () => setOpen(false),
    };
    if (!keys[e.key]) return;
    if (e.key !== "Tab") e.preventDefault();
    keys[e.key]();
  }

  function onButtonKey(e) {
    if (["ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      openList();
    }
  }

  const label = `${h === 0 ? 12 : h}:${String(m).padStart(2, "0")}`;

  return (
    <div className="tsel-row">
      <div className="tsel" ref={rootRef}>
        <button
          ref={buttonRef}
          type="button"
          className={`tsel-button${open ? " open" : ""}`}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onButtonKey}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Time, ${label}`}
        >
          <svg className="tsel-clock" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5V12l3 2" />
          </svg>
          <span className="tsel-value">{label}</span>
          <svg className="tsel-chev" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {open && (
          <ul
            ref={listRef}
            className="tsel-list"
            role="listbox"
            tabIndex={-1}
            aria-label="Time"
            aria-activedescendant={optionId(active)}
            onKeyDown={onListKey}
          >
            {SLOTS.map((s) => {
              const selected = s === current;
              return (
                <li
                  key={slotKey(s)}
                  id={optionId(s)}
                  role="option"
                  aria-selected={selected}
                  className={`tsel-option${selected ? " sel" : ""}${
                    s === active ? " active" : ""
                  }`}
                  onMouseEnter={() => setActive(s)}
                  onClick={() => choose(s)}
                >
                  {slotLabel(s)}
                  {selected && (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="ampm" role="radiogroup" aria-label="AM or PM">
        {[
          ["AM", false],
          ["PM", true],
        ].map(([text, isPm]) => (
          <button
            key={text}
            type="button"
            role="radio"
            aria-checked={pm === isPm}
            className={`ampm-btn${pm === isPm ? " sel" : ""}`}
            onClick={() => onChange(toValue(h, m, isPm))}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
