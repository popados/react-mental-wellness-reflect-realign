import { bandOf } from "../data/intensity";

const STEPS = Array.from({ length: 11 }, (_, n) => n);

export default function IntensityScale({ value, onChange, name }) {
  const band = value == null ? null : bandOf(value);

  return (
    <div className="intensity">
      <div className="intensity-scale" role="radiogroup" aria-label={name}>
        {STEPS.map((n) => {
          const b = bandOf(n);
          const selected = value === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${n}, ${b.label}`}
              className={`intensity-step${selected ? " sel" : ""}`}
              style={{ "--band": b.color }}
              onClick={() => onChange(n)}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="intensity-ends">
        <span>Not there</span>
        <span>Overwhelming</span>
      </div>
      <div
        className={`intensity-desc${band ? " on" : ""}`}
        style={band ? { "--band": band.color } : undefined}
        aria-live="polite"
      >
        {band ? (
          <>
            <strong>
              {value} · {band.label}
            </strong>
            <span>{band.anchor}</span>
          </>
        ) : (
          "Tap a number from 0 to 10."
        )}
      </div>
    </div>
  );
}
