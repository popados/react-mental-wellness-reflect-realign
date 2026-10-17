import { useState } from "react";
import { SENSATIONS, sensationColor } from "../data/bodySensations";
import { ENERGY_LEVELS, energyLabel } from "../data/energy";
import { fmtDate, fmtTime } from "../utils/dates";
import Squiggle from "../components/Squiggle";

export default function Checks({ checks, onLog, onDelete }) {
  const [sensation, setSensation] = useState(null);
  const [energy, setEnergy] = useState(3);
  const [note, setNote] = useState("");

  function submit() {
    onLog({ mood: sensation || "Tight", energy, note: note.trim() });
    setSensation(null);
    setNote("");
  }

  const history = checks.slice().reverse().slice(0, 12);

  return (
    <section className="screen">
      <div className="eyebrow">Body awareness</div>
      <h1 className="title">How's your body today?</h1>
      <Squiggle />

      <div className="card">
        <div className="field-label" style={{ marginTop: 0 }}>
          Body Awareness:
        </div>
        <p className="body-check-hint">
          Pause and notice — Helps you recognize sensations before the feeling.
        </p>
        <div className="emotion-select-row">
          {SENSATIONS.map((s) => (
            <button
              key={s.name}
              type="button"
              className={`chip-plain${sensation === s.name ? " sel" : ""}`}
              style={
                sensation === s.name
                  ? { background: s.color, borderColor: s.color, color: "#fff" }
                  : undefined
              }
              onClick={() => setSensation(s.name)}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="field-label">Energy:</div>
        <div className="emotion-select-row">
          {ENERGY_LEVELS.map((lvl) => (
            <button
              key={lvl.value}
              type="button"
              className={`chip-plain${energy === lvl.value ? " sel" : ""}`}
              style={
                energy === lvl.value
                  ? { background: lvl.color, borderColor: lvl.color, color: "#fff" }
                  : undefined
              }
              onClick={() => setEnergy(lvl.value)}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        <div className="field-label">Response (Optional):</div>
        <textarea
          className="note-input"
          rows="2"
          placeholder="Actions, Attitudes, Behaviors, Mannerisms, Patterns."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          className="btn btn-primary btn-block"
          style={{ marginTop: 16 }}
          onClick={submit}
        >
          Log body awareness
        </button>
      </div>

      <div className="section-label">Recent:</div>
      <div className="card">
        {history.length === 0 ? (
          <div className="empty">No body awareness check-ins yet. Your first one is above.</div>
        ) : (
          history.map((c) => (
            <div className="history-item" key={c.id}>
              <div
                className="mood-dot"
                style={{ background: sensationColor(c.mood) }}
              />
              <div className="meta">
                <div className="top">
                  {c.mood} · {energyLabel(c.energy)} energy
                </div>
                {c.note && <div className="note">{c.note}</div>}
              </div>
              <div className="when">
                {fmtDate(c.date)}
                <br />
                {fmtTime(c.date)}
              </div>
              <button
                className="x-btn"
                style={{ marginLeft: 4 }}
                onClick={() => onDelete(c.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
