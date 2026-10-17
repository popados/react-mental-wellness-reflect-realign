import { useState } from "react";
import Squiggle from "../components/Squiggle";
import WeekPicker from "../components/WeekPicker";
import { sensationColor } from "../data/bodySensations";
import { energyLabel } from "../data/energy";
import { addDays, dateKey, fmtWeekRange, parseKey, startOfWeek } from "../utils/dates";
import { shortSkill, weekStats } from "../utils/stats";

function MoodChip({ mood }) {
  if (!mood) return <span className="digest-none">—</span>;
  return (
    <span className="digest-mood">
      <span className="pie-swatch" style={{ background: sensationColor(mood.name) }} />
      {mood.name}
    </span>
  );
}

function Delta({ a, b }) {
  if (a === b) return <span className="delta same">same</span>;
  const up = b > a;
  return (
    <span className={`delta ${up ? "up" : "down"}`}>
      {up ? "▲" : "▼"} {Math.abs(b - a)}
    </span>
  );
}

const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

export default function Digest({ checks, emotions, copingLog, habits }) {
  const thisWeek = dateKey(startOfWeek());
  const [week, setWeek] = useState(thisWeek);
  const [weekA, setWeekA] = useState(() => dateKey(addDays(parseKey(thisWeek), -7)));
  const [weekB, setWeekB] = useState(thisWeek);

  const data = { checks, emotions, copingLog, habits };
  const s = weekStats(week, data);
  const a = weekStats(weekA, data);
  const b = weekStats(weekB, data);

  const rows = [
    { label: "Body awareness check-ins", a: a.checks, b: b.checks, numeric: true },
    {
      label: "Most frequent feeling",
      a: <MoodChip mood={a.topMood} />,
      b: <MoodChip mood={b.topMood} />,
    },
    {
      label: "Typical energy",
      a: a.energyAvg ? energyLabel(a.energyAvg) : "—",
      b: b.energyAvg ? energyLabel(b.energyAvg) : "—",
    },
    { label: "Coping skills used", a: a.coping, b: b.coping, numeric: true },
    {
      label: "Most-used coping skill",
      a: a.topCoping ? shortSkill(a.topCoping.name) : "—",
      b: b.topCoping ? shortSkill(b.topCoping.name) : "—",
    },
    { label: "Journal entries", a: a.journal.total, b: b.journal.total, numeric: true },
    { label: "Habit check-offs", a: a.habitsDone, b: b.habitsDone, numeric: true },
  ];

  return (
    <section className="screen">
      <div className="eyebrow">Weekly digest</div>
      <h1 className="title">Your week, gently</h1>
      <Squiggle />

      <div className="card digest-card">
        <WeekPicker value={week} onChange={setWeek} />

        <div className="digest-grid">
          <div className="digest-tile">
            <div className="digest-k">Most frequent feeling</div>
            <div className="digest-v">
              <MoodChip mood={s.topMood} />
            </div>
            {s.topMood && (
              <div className="digest-sub">
                {s.topMood.count} of {plural(s.checks, "check-in")}
              </div>
            )}
          </div>

          <div className="digest-tile">
            <div className="digest-k">Most-used coping skill</div>
            <div className="digest-v digest-v-text">
              {s.topCoping ? shortSkill(s.topCoping.name) : <span className="digest-none">—</span>}
            </div>
            {s.topCoping && (
              <div className="digest-sub">{plural(s.topCoping.count, "time")}</div>
            )}
          </div>

          <div className="digest-tile">
            <div className="digest-k">Journal entries</div>
            <div className="digest-v digest-num">{s.journal.total}</div>
            <div className="digest-sub">
              {plural(s.journal.records, "thought record")} ·{" "}
              {plural(s.journal.notes, "body awareness note")}
            </div>
          </div>

          <div className="digest-tile">
            <div className="digest-k">Habit check-offs</div>
            <div className="digest-v digest-num">{s.habitsDone}</div>
            <div className="digest-sub">
              {s.habitsScheduled
                ? `of ${plural(s.habitsScheduled, "scheduled day")}`
                : "no habits scheduled"}
            </div>
          </div>
        </div>

        <div className="digest-highlight">
          <div className="digest-k">Highlight</div>
          <p>
            {s.highlight ||
              (week === thisWeek
                ? "Nothing logged yet this week — your first check-in will show up here."
                : "Nothing was logged this week.")}
          </p>
        </div>
      </div>

      <div className="section-label">Compare weeks</div>
      <div className="card compare-card">
        <div className="compare-pickers">
          <WeekPicker label="Week A" value={weekA} onChange={setWeekA} />
          <WeekPicker label="Week B" value={weekB} onChange={setWeekB} />
        </div>

        <div className="compare-table" role="table">
          <div className="compare-row compare-head" role="row">
            <span role="columnheader" />
            <span role="columnheader">{fmtWeekRange(weekA)}</span>
            <span role="columnheader">{fmtWeekRange(weekB)}</span>
          </div>
          {rows.map((r) => (
            <div className="compare-row" role="row" key={r.label}>
              <span className="compare-label" role="rowheader">
                {r.label}
              </span>
              <span role="cell">{r.a}</span>
              <span role="cell">
                {r.b}
                {r.numeric && <Delta a={r.a} b={r.b} />}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
