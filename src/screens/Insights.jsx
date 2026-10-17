import { useState } from "react";
import Squiggle from "../components/Squiggle";
import DonutChart from "../components/DonutChart";
import BarList from "../components/BarList";
import DayStrip from "../components/DayStrip";
import { sensationColor } from "../data/bodySensations";
import { energyColor, energyLabel } from "../data/energy";
import { lastNDayKeys } from "../utils/dates";
import { consistency, emotionBreakdown, sensationBreakdown } from "../utils/stats";

const RANGES = [7, 30, 90];

export default function Insights({ checks, emotions, habits }) {
  const [range, setRange] = useState(30);
  const dayKeys = lastNDayKeys(range);
  const c = consistency(dayKeys, { checks, habits });

  const moodDays = dayKeys.map((key) => {
    const check = c.lastCheckByDay.get(key);
    return { key, color: check && sensationColor(check.mood), label: check?.mood };
  });
  const energyDays = dayKeys.map((key) => {
    const check = c.lastCheckByDay.get(key);
    return {
      key,
      color: check && energyColor(check.energy),
      label: check && `${energyLabel(check.energy)} energy`,
    };
  });

  return (
    <section className="screen">
      <div className="eyebrow">Insights</div>
      <h1 className="title">What the data shows</h1>
      <Squiggle />

      <div className="pattern-switch">
        {RANGES.map((r) => (
          <button
            key={r}
            className={`pattern-btn${range === r ? " sel" : ""}`}
            onClick={() => setRange(r)}
          >
            Last {r} days
          </button>
        ))}
      </div>

      <div className="section-label">Consistency</div>
      <div className="card insight-card">
        <div className="insight-head">
          <h3>Body awareness</h3>
          <span className="insight-stat">
            {c.loggedDays} of {range} days
          </span>
        </div>
        <DayStrip days={moodDays} />

        <div className="insight-head">
          <h3>Energy</h3>
          <span className="insight-stat">
            {c.topEnergy
              ? `Most often ${c.topEnergy.names.join(" & ").toLowerCase()} · ${
                  c.topEnergy.names.length > 1 ? `${c.topEnergy.count} each` : `${c.topEnergy.count} of ${c.checkCount}`
                }`
              : "No energy logged"}
          </span>
        </div>
        <DayStrip days={energyDays} />
        <BarList items={c.energyCounts} emptyText="" />

        <div className="insight-head">
          <h3>Habits</h3>
        </div>
        {c.habitRows.length === 0 ? (
          <div className="empty">No habits yet — add some on the Habits screen.</div>
        ) : (
          <div className="habit-consistency">
            {c.habitRows.map((h) => {
              const pct = h.scheduled ? Math.round((h.done / h.scheduled) * 100) : 0;
              return (
                <div className="hc-row" key={h.id}>
                  <div className="hc-top">
                    <span className="hc-name">{h.name}</span>
                    <span className="hc-stat">
                      {h.scheduled ? `${h.done} of ${h.scheduled} days` : "not scheduled yet"} · 🔥{" "}
                      {h.streak}
                    </span>
                  </div>
                  <span className="bar-track">
                    <span className="bar-fill" style={{ width: `${pct}%` }} />
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="section-label">Body awareness breakdown</div>
      <div className="card">
        <BarList
          items={sensationBreakdown(checks, dayKeys)}
          emptyText="Log a body awareness check-in to see which sensations show up most."
        />
      </div>

      <div className="section-label">Emotional breakdown</div>
      <div className="card">
        <DonutChart
          items={emotionBreakdown(emotions, dayKeys)}
          emptyText="Log a thought record to see your emotional breakdown."
        />
      </div>
    </section>
  );
}
