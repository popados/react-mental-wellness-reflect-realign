import { useEffect, useRef, useState } from "react";
import Squiggle from "../components/Squiggle";
import TimePicker from "../components/TimePicker";
import DayChips from "../components/DayChips";
import {
  ALL_DAYS,
  computeStreak,
  daysSummary,
  fmtClock,
  fmtHour,
  habitDays,
  isCompletedOn,
  isScheduledOn,
  minutesOf,
} from "../utils/habits";
import { playChime, primeAudio } from "../utils/sound";

const endTimeIn = (seconds) => Date.now() + seconds * 1000;

function MinuteStepper({ value, onChange, className = "" }) {
  return (
    <div className={`timer-duration-row habit-timer-row ${className}`}>
      <button
        type="button"
        className="timer-step-btn"
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Fewer minutes"
      >
        −
      </button>
      <div className="timer-duration-label">{value} min</div>
      <button
        type="button"
        className="timer-step-btn"
        onClick={() => onChange(Math.min(120, value + 1))}
        aria-label="More minutes"
      >
        +
      </button>
    </div>
  );
}

function Timeline({ habits }) {
  const now = new Date();
  const nowPct = ((now.getHours() * 60 + now.getMinutes()) / 1440) * 100;
  return (
    <div className="timeline">
      <div className="timeline-track">
        {habits.map((h) => (
          <div
            key={h.id}
            className={`timeline-mark${isCompletedOn(h) ? " done" : ""}`}
            style={{ left: `${(minutesOf(h.time) / 1440) * 100}%` }}
            title={`${h.name} · ${fmtHour(h.time)}`}
          />
        ))}
        <div className="timeline-now" style={{ left: `${nowPct}%` }} />
      </div>
      <div className="timeline-labels">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>12 AM</span>
      </div>
    </div>
  );
}

export default function Habits({
  habits,
  onAdd,
  onToggleToday,
  onSetDuration,
  onDelete,
  showToast,
}) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("09:00");
  const [days, setDays] = useState(ALL_DAYS);
  const [useTimer, setUseTimer] = useState(false);
  const [minutes, setMinutes] = useState(10);

  // { id, remaining, endsAt } — endsAt is set while running. Counting down to
  // a fixed end time keeps the timer accurate when the browser throttles
  // intervals in a background tab.
  const [timer, setTimer] = useState(null);
  const latest = useRef({ habits, onToggleToday, showToast });
  useEffect(() => {
    latest.current = { habits, onToggleToday, showToast };
  });

  const timerId = timer?.id;
  const endsAt = timer?.endsAt;
  useEffect(() => {
    if (!endsAt) return;
    const tick = setInterval(() => {
      const remaining = Math.ceil((endsAt - Date.now()) / 1000);
      if (remaining > 0) {
        setTimer((t) => t && { ...t, remaining });
        return;
      }
      clearInterval(tick);
      setTimer(null);
      playChime();
      const { habits: hs, onToggleToday: toggle, showToast: toast } = latest.current;
      const habit = hs.find((h) => h.id === timerId);
      if (!habit) return;
      if (!isCompletedOn(habit)) toggle(habit.id);
      toast(`Timer done — “${habit.name}” checked off`);
    }, 250);
    return () => clearInterval(tick);
  }, [timerId, endsAt]);

  function submit() {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd({ name: trimmed, time, days, duration: useTimer ? minutes : null });
    setName("");
  }

  function startTimer(habit) {
    primeAudio();
    const remaining =
      timer && timer.id === habit.id ? timer.remaining : habit.duration * 60;
    setTimer({ id: habit.id, remaining, endsAt: endTimeIn(remaining) });
  }

  function pauseTimer() {
    setTimer((t) => t && { id: t.id, remaining: t.remaining, endsAt: null });
  }

  const [editing, setEditing] = useState(null); // { id, minutes }

  function saveDuration(id, duration) {
    // A timer already running for this habit would keep the old length.
    if (timer?.id === id) setTimer(null);
    onSetDuration(id, duration);
    setEditing(null);
  }

  const sorted = habits.slice().sort((a, b) => minutesOf(a.time) - minutesOf(b.time));
  const today = new Date();
  const todays = sorted.filter((h) => isScheduledOn(h, today));

  return (
    <section className="screen">
      <div className="eyebrow">Daily habits</div>
      <h1 className="title">Small things, often</h1>
      <Squiggle />

      <div className="card habit-card">
        <div className="field-label" style={{ marginTop: 0 }}>
          New habit
        </div>
        <input
          className="habit-name-input"
          type="text"
          placeholder="e.g. Drink water"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />

        <div className="field-label">Time of day</div>
        <TimePicker value={time} onChange={setTime} />

        <div className="field-label">Repeat on</div>
        <DayChips value={days} onChange={setDays} />

        <label className="timer-toggle">
          <input
            type="checkbox"
            checked={useTimer}
            onChange={(e) => setUseTimer(e.target.checked)}
          />
          Add a timer (optional)
        </label>
        {useTimer && <MinuteStepper value={minutes} onChange={setMinutes} />}

        <button className="btn btn-primary btn-block" style={{ marginTop: 16 }} onClick={submit}>
          Add habit
        </button>
      </div>

      {todays.length > 0 && (
        <>
          <div className="section-label">Today across 24 hours</div>
          <div className="card">
            <Timeline habits={todays} />
          </div>
        </>
      )}

      <div className="section-label">Your habits</div>
      <div className="card">
        {sorted.length === 0 ? (
          <div className="empty">No habits yet. Add one above and pick when it happens.</div>
        ) : (
          <div className="habit-list">
            {sorted.map((h) => {
              const done = isCompletedOn(h);
              const scheduledToday = isScheduledOn(h, today);
              const active = timer && timer.id === h.id;
              const ticking = active && Boolean(timer.endsAt);
              const edit = editing?.id === h.id ? editing : null;
              return (
                <div className="habit-entry" key={h.id}>
                  <div className={`habit-item${scheduledToday ? "" : " off-day"}`}>
                    <button
                      className={`habit-check${done ? " done" : ""}`}
                      onClick={() => onToggleToday(h.id)}
                      aria-label={done ? "Mark not done" : "Mark done"}
                    >
                      {done && (
                        <svg viewBox="0 0 24 24">
                          <path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <div className="habit-meta">
                      <div className="habit-name">{h.name}</div>
                      <div className="habit-time">
                        {fmtHour(h.time)} · {daysSummary(habitDays(h))}
                        {!scheduledToday && " · not today"}
                      </div>
                      {!edit && (
                        <button
                          className="habit-link"
                          onClick={() =>
                            setEditing({ id: h.id, minutes: h.duration || 10 })
                          }
                        >
                          {h.duration ? "Edit timer" : "+ Add timer"}
                        </button>
                      )}
                    </div>
                    {h.duration && (
                      <div className="habit-timer">
                        {active && <span className="habit-timer-clock">{fmtClock(timer.remaining)}</span>}
                        <button
                          className="habit-timer-btn"
                          onClick={() => (ticking ? pauseTimer() : startTimer(h))}
                          aria-label={ticking ? "Pause timer" : "Start timer"}
                        >
                          {ticking ? "Pause" : active ? "Resume" : `${h.duration}m`}
                        </button>
                        {active && (
                          <button className="x-btn" onClick={() => setTimer(null)} aria-label="Cancel timer">
                            ↺
                          </button>
                        )}
                      </div>
                    )}
                    <div className="habit-streak" title="Current streak">
                      🔥 {computeStreak(h)}
                    </div>
                    <button className="x-btn" onClick={() => onDelete(h.id)} aria-label="Delete habit">
                      ✕
                    </button>
                  </div>
                  {edit && (
                    <div className="timer-editor">
                      <div className="timer-editor-label">
                        {h.duration ? "Timer length" : `Add a timer to “${h.name}”`}
                      </div>
                      <MinuteStepper
                        value={edit.minutes}
                        onChange={(m) => setEditing({ ...edit, minutes: m })}
                      />
                      <div className="timer-editor-actions">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => saveDuration(h.id, edit.minutes)}
                        >
                          Save
                        </button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}>
                          Cancel
                        </button>
                        {h.duration && (
                          <button
                            className="habit-link timer-remove"
                            onClick={() => saveDuration(h.id, null)}
                          >
                            Remove timer
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
