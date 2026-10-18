import { useState } from "react";
import { EMOTIONS } from "../data/emotions";
import { fmtDate, fmtTime } from "../utils/dates";
import Squiggle from "../components/Squiggle";
import CareNote from "../components/CareNote";
import IntensityScale from "../components/IntensityScale";
import { bandOf } from "../data/intensity";

// New records store `intensity` on a 0–10 scale; older ones stored
// `before`/`after` on 1–5, so those keep an explicit "/5".
function intensityText(entry, withLabel) {
  if (entry.intensity != null) {
    const label = withLabel ? ` · ${bandOf(entry.intensity).label}` : "";
    return `${entry.intensity}/10${label}`;
  }
  const after = entry.after != null ? ` → ${entry.after}/5` : "";
  return `${entry.before}/5${after}`;
}

function RecordEntry({ entry, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="entry">
      <div className="entry-top" onClick={() => setOpen((o) => !o)}>
        <div>
          <div className="entry-date">
            {fmtDate(entry.date)} · {fmtTime(entry.date)}
          </div>
          <div className="entry-title">
            {entry.emotion} · {intensityText(entry, false)}
          </div>
          {open ? (
            <div className="entry-full">
              <div className="record-field">
                <span className="record-label">Situation:</span>
                {entry.situation}
              </div>
              <div className="record-field">
                <span className="record-label">Thoughts:</span>
                {entry.thought}
              </div>
              <div className="record-field">
                <span className="record-label">Emotion:</span>
                {entry.emotion}
              </div>
              <div className="record-field">
                <span className="record-label">Emotional Intensity:</span>
                {intensityText(entry, true)}
              </div>
              {entry.behaviors && (
                <div className="record-field">
                  <span className="record-label">Behaviors:</span>
                  {entry.behaviors}
                </div>
              )}
              {entry.reflection && (
                <div className="record-field">
                  <span className="record-label">
                    Evidence &amp; balanced change:
                  </span>
                  {entry.reflection}
                </div>
              )}
              {entry.evidenceFor && (
                <div className="record-field">
                  <span className="record-label">Evidence for:</span>
                  {entry.evidenceFor}
                </div>
              )}
              {entry.evidenceAgainst && (
                <div className="record-field">
                  <span className="record-label">Evidence against:</span>
                  {entry.evidenceAgainst}
                </div>
              )}
              {entry.balanced && (
                <div className="record-field">
                  <span className="record-label">More balanced thought:</span>
                  {entry.balanced}
                </div>
              )}
            </div>
          ) : (
            <div className="entry-preview">
              {entry.situation.slice(0, 90)}
              {entry.situation.length > 90 ? "…" : ""}
            </div>
          )}
        </div>
      </div>
      <div className="entry-actions">
        <button className="x-btn" onClick={() => onDelete(entry.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default function Emotions({ entries, onSave, onDelete, showToast }) {
  const [situation, setSituation] = useState("");
  const [thought, setThought] = useState("");
  const [emotion, setEmotion] = useState(EMOTIONS[0].name);
  const [intensity, setIntensity] = useState(null);
  const [behaviors, setBehaviors] = useState("");

  function resetForm() {
    setSituation("");
    setThought("");
    setEmotion(EMOTIONS[0].name);
    setIntensity(null);
    setBehaviors("");
  }

  function save() {
    if (!situation.trim() || !thought.trim()) {
      showToast("Fill in at least the situation and thoughts");
      return;
    }
    if (intensity == null) {
      showToast("Choose an emotional intensity from 0 to 10");
      return;
    }
    onSave({
      situation: situation.trim(),
      thought: thought.trim(),
      emotion,
      intensity,
      behaviors: behaviors.trim(),
    });
    resetForm();
  }

  return (
    <section className="screen">
      <div className="eyebrow">Thought record</div>
      <h1 className="title">Emotions</h1>
      <Squiggle />

      <div className="card record-card">
        <div className="field-label" style={{ marginTop: 0 }}>
          Situation:
        </div>
        <textarea
          className="note-input"
          rows="2"
          placeholder="What happened? Where were you, who was there?"
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
        />

        <div className="field-label">Thoughts:</div>
        <textarea
          className="note-input"
          rows="2"
          placeholder="What went through your mind?"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
        />

        <div className="field-label">Emotion:</div>
        <div className="emotion-select-row">
          {EMOTIONS.map((em) => (
            <button
              key={em.name}
              type="button"
              className={`chip-plain${emotion === em.name ? " sel" : ""}`}
              style={
                emotion === em.name
                  ? { background: em.color, borderColor: em.color, color: "#fff" }
                  : undefined
              }
              onClick={() => setEmotion(em.name)}
            >
              {em.name}
            </button>
          ))}
        </div>

        <div className="field-label">Emotional Intensity:</div>
        <IntensityScale
          value={intensity}
          onChange={setIntensity}
          name="Emotional intensity"
        />

        <div className="field-label">Behaviors:</div>
        <textarea
          className="note-input"
          rows="3"
          placeholder="What did you do, or feel the urge to do?"
          value={behaviors}
          onChange={(e) => setBehaviors(e.target.value)}
        />

        <button
          className="btn btn-primary btn-block"
          style={{ marginTop: 16 }}
          onClick={save}
        >
          Save thought record
        </button>
      </div>

      <div className="section-label">Logged thoughts</div>
      <div className="card">
        {entries.length === 0 ? (
          <div className="empty">
            No thought records yet. Fill in the form above to log your first
            one.
          </div>
        ) : (
          entries
            .slice()
            .reverse()
            .map((e) => (
              <RecordEntry key={e.id} entry={e} onDelete={onDelete} />
            ))
        )}
      </div>

      <CareNote />
    </section>
  );
}
