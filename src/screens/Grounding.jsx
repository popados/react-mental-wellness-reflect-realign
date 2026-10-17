import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BREATH_PATTERNS } from "../data/prompts";
import Squiggle from "../components/Squiggle";
import { playChime, primeAudio } from "../utils/sound";

const PATTERN_LABELS = [
  { key: "box", label: "Box · 4-4-4-4" },
  { key: "calm", label: "Calm · 4-7-8" },
  { key: "simple", label: "Simple · 4-6" },
];

const SENSES = [
  { n: 5, text: "Things you can see around you" },
  { n: 4, text: "Things you can touch or feel" },
  { n: 3, text: "Things you can hear right now" },
  { n: 2, text: "Things you can smell" },
  { n: 1, text: "Thing you can taste" },
];

function formatClock(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function Grounding() {
  const [pattern, setPattern] = useState("box");
  const [running, setRunning] = useState(false);
  const [phaseLabel, setPhaseLabel] = useState("Ready");
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [cycles, setCycles] = useState(0);
  const [sensesOpen, setSensesOpen] = useState(false);

  const [durationMinutes, setDurationMinutes] = useState(5);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState(null);

  const phaseIndexRef = useRef(0);
  const secondsRef = useRef(0);
  const cyclesRef = useRef(0);
  const ringRef = useRef(null);
  const timerRemainingRef = useRef(0);

  const timerActive = timerRunning || timerRemaining !== null;

  function adjustDuration(delta) {
    if (timerActive) return;
    setDurationMinutes((d) => Math.min(60, Math.max(1, d + delta)));
  }

  function toggleTimer() {
    if (timerRunning) {
      setTimerRunning(false);
      return;
    }
    primeAudio();
    if (timerRemainingRef.current <= 0) {
      timerRemainingRef.current = durationMinutes * 60;
      setTimerRemaining(timerRemainingRef.current);
    }
    setTimerRunning(true);
  }

  function resetTimer() {
    setTimerRunning(false);
    timerRemainingRef.current = 0;
    setTimerRemaining(null);
  }

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      timerRemainingRef.current -= 1;
      if (timerRemainingRef.current <= 0) {
        timerRemainingRef.current = 0;
        setTimerRemaining(null);
        setTimerRunning(false);
        playChime();
      } else {
        setTimerRemaining(timerRemainingRef.current);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  function applyRing(dir, dur) {
    const ring = ringRef.current;
    if (!ring) return;
    ring.style.transitionDuration = dur + "s";
    if (dir === "in") ring.style.transform = "scale(1.05)";
    else if (dir === "out") ring.style.transform = "scale(0.72)";
  }

  function startPhase() {
    const phase = BREATH_PATTERNS[pattern][phaseIndexRef.current];
    secondsRef.current = phase.dur;
    setSecondsLeft(phase.dur);
    setPhaseLabel(phase.label);
    applyRing(phase.dir, phase.dur);
  }

  function reset() {
    setRunning(false);
    phaseIndexRef.current = 0;
    secondsRef.current = 0;
    cyclesRef.current = 0;
    setCycles(0);
    setSecondsLeft(null);
    setPhaseLabel("Ready");
    const ring = ringRef.current;
    if (ring) {
      ring.style.transitionDuration = ".6s";
      ring.style.transform = "scale(0.85)";
    }
  }

  function selectPattern(key) {
    setPattern(key);
    reset();
  }

  function toggle() {
    if (running) {
      setRunning(false);
    } else {
      if (secondsRef.current === 0) startPhase();
      setRunning(true);
    }
  }

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      secondsRef.current -= 1;
      if (secondsRef.current <= 0) {
        const len = BREATH_PATTERNS[pattern].length;
        phaseIndexRef.current = (phaseIndexRef.current + 1) % len;
        if (phaseIndexRef.current === 0) {
          cyclesRef.current += 1;
          setCycles(cyclesRef.current);
        }
        startPhase();
      } else {
        setSecondsLeft(secondsRef.current);
      }
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, pattern]);

  const cycleText = `${cycles} ${cycles === 1 ? "cycle" : "cycles"} completed`;

  return (
    <section className="screen">
      <div className="eyebrow">Grounding exercise</div>
      <h1 className="title">Breathe with the rings</h1>
      <Squiggle />

      <button
        className="btn btn-ghost btn-block senses-open-btn"
        onClick={() => setSensesOpen(true)}
      >
        Prefer your senses? Try 5-4-3-2-1
      </button>

      <div className="pattern-switch">
        {PATTERN_LABELS.map((p) => (
          <button
            key={p.key}
            className={`pattern-btn${pattern === p.key ? " sel" : ""}`}
            onClick={() => selectPattern(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="card ring-stage">
        <div className={`ring-wrap${running ? " pulsing" : ""}`} ref={ringRef}>
          <svg viewBox="0 0 220 220">
            <circle cx="110" cy="110" r="100" stroke="var(--line)" strokeWidth="1.5" opacity="0.5" />
            <circle cx="110" cy="110" r="76" stroke="var(--line)" strokeWidth="1.5" opacity="0.7" />
            <circle cx="110" cy="110" r="52" stroke="var(--moss)" strokeWidth="1.8" opacity="0.75" />
            <circle cx="110" cy="110" r="28" stroke="var(--moss-deep)" strokeWidth="2.2" />
          </svg>
        </div>
        <div className="phase-label">{phaseLabel}</div>
        <div className="phase-count">{secondsLeft === null ? "—" : secondsLeft}</div>
        <div className="cycle-count">{cycleText}</div>
        <div className="ground-controls">
          <button className="btn btn-primary" onClick={toggle}>
            {running ? "Pause" : "Start"}
          </button>
          <button className="btn btn-ghost" onClick={reset}>
            Reset
          </button>
        </div>
      </div>

      <div className="card timer-card">
        <h3>Timer</h3>
        <div className="timer-remaining">
          {formatClock(timerRemaining ?? durationMinutes * 60)}
        </div>
        <div className="timer-duration-row">
          <button
            className="timer-step-btn"
            onClick={() => adjustDuration(-1)}
            disabled={timerActive}
            aria-label="Decrease minutes"
          >
            −
          </button>
          <div className="timer-duration-label">{durationMinutes} min</div>
          <button
            className="timer-step-btn"
            onClick={() => adjustDuration(1)}
            disabled={timerActive}
            aria-label="Increase minutes"
          >
            +
          </button>
        </div>
        <input
          type="range"
          className="timer-slider"
          min="1"
          max="60"
          step="1"
          value={durationMinutes}
          disabled={timerActive}
          onChange={(e) => setDurationMinutes(Number(e.target.value))}
        />
        <div className="ground-controls">
          <button className="btn btn-primary" onClick={toggleTimer}>
            {timerRunning ? "Pause" : timerRemaining ? "Resume" : "Start"}
          </button>
          <button className="btn btn-ghost" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>

      {sensesOpen &&
        createPortal(
          <div className="modal-overlay" onClick={() => setSensesOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>Prefer your senses? Try 5-4-3-2-1</h3>
                <button
                  className="modal-close"
                  onClick={() => setSensesOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <p className="modal-sub">
                Notice each one slowly, then check it off.
              </p>
              {SENSES.map((s) => (
                <div className="sense-step" key={s.n}>
                  <span className="num">{s.n}</span>
                  <input type="checkbox" id={`s${s.n}`} />
                  <label htmlFor={`s${s.n}`}>{s.text}</label>
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
