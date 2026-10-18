import { useState } from "react";
import { AFFIRMATIONS } from "../data/affirmations";
import { dayOfYear, isSameDay } from "../utils/dates";
import { SENSATIONS } from "../data/bodySensations";
import CareNote from "../components/CareNote";

function greeting(hr) {
  return hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";
}

export default function Home({ name, checks, onNavigate, onQuickLog, onReset }) {
  const now = new Date();
  const [flashSensation, setFlashSensation] = useState(null);

  function quickLog(sensation) {
    setFlashSensation(sensation);
    setTimeout(() => setFlashSensation(null), 500);
    onQuickLog(sensation);
  }

  const todayAffirm = AFFIRMATIONS[dayOfYear(now) % AFFIRMATIONS.length];

  const trail = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    trail.push({
      done: checks.some((c) => isSameDay(new Date(c.date), d)),
      today: i === 0,
      label: d.toLocaleDateString(undefined, { weekday: "narrow" }),
    });
  }

  return (
    <section className="screen">
      <svg className="contours" viewBox="0 0 460 210" preserveAspectRatio="none">
        <path d="M-10,40 Q100,10 230,40 T480,40" />
        <path d="M-10,80 Q120,55 230,80 T480,80" opacity="0.7" />
        <path d="M-10,120 Q90,150 230,120 T480,120" opacity="0.5" />
      </svg>
      <div className="eyebrow">REFLECT &amp; REALIGN</div>
      <div className="greet-row">
        <div>
          <h1 className="title">
            {greeting(now.getHours())}
            {name ? `, ${name}` : ""}
          </h1>
          <div className="subtitle">
            {now.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      <div className="trail">
        {trail.map((t, i) => (
          <div className="trail-dot-wrap" key={i}>
            <div className="trail-line" />
            <div
              className={`trail-dot${t.done ? " done" : ""}${t.today ? " today" : ""}`}
            />
            <div className="trail-label">{t.label}</div>
          </div>
        ))}
      </div>

      <div className="section-label">Today's affirmation</div>
      <div className="affirm-preview" onClick={() => onNavigate("affirmation")}>
        <p>{todayAffirm}</p>
        <div className="tap-hint">Read it slowly →</div>
      </div>

      <div className="section-label">Daily mood</div>
      <div className="card action-box mood-box">
        <p>How does your body feel right now? Tap one to log it.</p>
        <div className="emotion-select-row">
          {SENSATIONS.map((s) => (
            <button
              key={s.name}
              type="button"
              className={`chip-plain${flashSensation === s.name ? " flash" : ""}`}
              style={
                flashSensation === s.name
                  ? { background: s.color, borderColor: s.color, color: "#fff" }
                  : undefined
              }
              onClick={() => quickLog(s.name)}
            >
              {s.name}
            </button>
          ))}
        </div>
        <button
          className="btn btn-primary"
          style={{ marginTop: 14 }}
          onClick={() => onNavigate("checks")}
        >
          Open Body Awareness
        </button>
      </div>

      <div className="section-label">Grounding</div>
      <div className="cta-band">
        <p>
          When it feels like too much, a few minutes of steady breathing can
          bring you back.
        </p>
        <button
          className="btn btn-ghost"
          onClick={() => onNavigate("grounding")}
        >
          Start grounding exercise
        </button>
      </div>

      <div className="section-label">Emotions</div>
      <div className="card action-box emotions-box">
        <p>Work through a tough thought with a quick thought record.</p>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate("emotions")}
        >
          Log a thought
        </button>
      </div>

      <CareNote>
        <button className="reset-link" onClick={onReset}>
          Clear my saved data
        </button>
      </CareNote>
    </section>
  );
}
