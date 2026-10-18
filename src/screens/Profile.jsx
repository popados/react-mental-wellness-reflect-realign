import { useState } from "react";
import Squiggle from "../components/Squiggle";

const INTENTIONS = [
  "Manage stress",
  "Understand my emotions",
  "Build steady habits",
  "Sleep better",
  "Ride out hard moments",
  "Learn CBT & DBT skills",
  "Feel more connected",
];

function memberSince(dates) {
  if (!dates.length) return null;
  const first = new Date(Math.min(...dates));
  return first.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

export default function Profile({
  profile,
  onSave,
  stats,
  firstActivity,
  onExport,
  onReset,
}) {
  const [name, setName] = useState(profile.name || "");
  const [pronouns, setPronouns] = useState(profile.pronouns || "");
  const [intentions, setIntentions] = useState(profile.intentions || []);
  const [note, setNote] = useState(profile.note || "");

  const dirty =
    name !== (profile.name || "") ||
    pronouns !== (profile.pronouns || "") ||
    note !== (profile.note || "") ||
    intentions.join("|") !== (profile.intentions || []).join("|");

  function toggleIntention(i) {
    setIntentions((list) =>
      list.includes(i) ? list.filter((x) => x !== i) : [...list, i]
    );
  }

  function save() {
    onSave({
      name: name.trim(),
      pronouns: pronouns.trim(),
      intentions: INTENTIONS.filter((i) => intentions.includes(i)),
      note: note.trim(),
    });
  }

  const initial = name.trim().charAt(0).toUpperCase();
  const since = memberSince(firstActivity);

  return (
    <section className="screen">
      <div className="eyebrow">Profile</div>
      <h1 className="title">About you</h1>
      <Squiggle />

      <div className="card profile-head">
        <div className="profile-avatar" aria-hidden="true">
          {initial || (
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="8.5" r="3.8" />
              <path d="M4.5 20c1.4-3.6 4.2-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
            </svg>
          )}
        </div>
        <div className="profile-id">
          <div className="profile-name">{name.trim() || "Your name"}</div>
          <div className="profile-sub">
            {pronouns.trim() && <span>{pronouns.trim()} · </span>}
            {since ? `Here since ${since}` : "Just getting started"}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="field-label" style={{ marginTop: 0 }}>
          Name:
        </div>
        <input
          className="habit-name-input"
          type="text"
          placeholder="What should we call you?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
        />

        <div className="field-label">Pronouns (Optional):</div>
        <input
          className="habit-name-input"
          type="text"
          placeholder="e.g. she/her, he/him, they/them"
          value={pronouns}
          onChange={(e) => setPronouns(e.target.value)}
          maxLength={30}
        />

        <div className="field-label">What brings you here:</div>
        <div className="emotion-select-row">
          {INTENTIONS.map((i) => (
            <button
              key={i}
              type="button"
              className={`chip-plain tp-chip${intentions.includes(i) ? " on" : ""}`}
              onClick={() => toggleIntention(i)}
              aria-pressed={intentions.includes(i)}
            >
              {i}
            </button>
          ))}
        </div>

        <div className="field-label">A note to yourself (Optional):</div>
        <textarea
          className="note-input"
          rows="3"
          placeholder="Why this matters to you, or something you want to remember on hard days."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          className="btn btn-primary btn-block"
          style={{ marginTop: 16 }}
          onClick={save}
          disabled={!dirty}
        >
          {dirty ? "Save profile" : "Saved"}
        </button>
      </div>

      <div className="section-label">Your journey:</div>
      <div className="card profile-stats">
        {stats.map((s) => (
          <div className="profile-stat" key={s.label}>
            <div className="digest-num">{s.value}</div>
            <div className="digest-sub">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="section-label">Your data:</div>
      <div className="card">
        <p className="section-intro">
          Everything you log stays in this browser — there's no account and
          nothing is sent anywhere. Export a copy to keep a backup or share it
          with someone who supports you.
        </p>
        <div className="profile-actions">
          <button className="btn btn-ghost" onClick={onExport}>
            Export my data
          </button>
          <button className="reset-link" onClick={onReset}>
            Clear my saved data
          </button>
        </div>
      </div>
    </section>
  );
}
