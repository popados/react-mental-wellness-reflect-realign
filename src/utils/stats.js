import { SENSATIONS, sensationScore } from "../data/bodySensations";
import { EMOTIONS } from "../data/emotions";
import { ENERGY_LEVELS } from "../data/energy";
import { dateKey, fmtWeekday, weekKeys } from "./dates";
import { computeStreak, scheduledKeys } from "./habits";

const keyOf = (iso) => dateKey(new Date(iso));

function mostFrequent(items, pick) {
  const counts = new Map();
  for (const item of items) {
    const k = pick(item);
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  let best = null;
  for (const [name, count] of counts) {
    if (!best || count > best.count) best = { name, count };
  }
  return best;
}

export function shortSkill(skill) {
  return skill.split(" — ")[0];
}

function pickHighlight({ wEmotions, wChecks, habitRows, wCoping }) {
  // Only older thought records have an "after" rating.
  const eased = wEmotions
    .filter((e) => e.after != null)
    .map((e) => ({ e, drop: e.before - e.after }))
    .filter((x) => x.drop >= 1)
    .sort((a, b) => b.drop - a.drop)[0];
  if (eased) {
    const { e } = eased;
    return `On ${fmtWeekday(new Date(e.date))}, a thought record eased ${e.emotion.toLowerCase()} from ${e.before} to ${e.after}.`;
  }

  const habit = habitRows
    .filter((r) => r.done >= 3)
    .sort((a, b) => b.done - a.done)[0];
  if (habit) {
    return `You kept up “${habit.name}” on ${habit.done} days.`;
  }

  const good = wChecks.filter((c) => sensationScore(c.mood) >= 4).at(-1);
  if (good) {
    const note = good.note ? ` — “${good.note}”` : "";
    return `On ${fmtWeekday(new Date(good.date))} you felt ${good.mood.toLowerCase()}${note}.`;
  }

  const record = wEmotions.at(-1);
  if (record) {
    return `On ${fmtWeekday(new Date(record.date))} you worked through feeling ${record.emotion.toLowerCase()} with a thought record.`;
  }

  if (wCoping.length) {
    return `You reached for a coping skill ${wCoping.length} ${wCoping.length === 1 ? "time" : "times"}.`;
  }
  return null;
}

export function weekStats(startKey, { checks, emotions, copingLog, habits }) {
  const keys = weekKeys(startKey);
  const inWeek = (item) => keys.includes(keyOf(item.date));

  const wChecks = checks.filter(inWeek);
  const wEmotions = emotions.filter(inWeek);
  const wCoping = copingLog.filter(inWeek);

  const habitRows = habits.map((h) => ({
    name: h.name,
    done: h.completions.filter((k) => keys.includes(k)).length,
    scheduled: scheduledKeys(h, keys).length,
  }));

  const energyAvg = wChecks.length
    ? wChecks.reduce((sum, c) => sum + c.energy, 0) / wChecks.length
    : null;
  const notedChecks = wChecks.filter((c) => c.note).length;

  return {
    checks: wChecks.length,
    topMood: mostFrequent(wChecks, (c) => c.mood),
    energyAvg,
    coping: wCoping.length,
    topCoping: mostFrequent(wCoping, (l) => l.skill),
    journal: {
      total: wEmotions.length + notedChecks,
      records: wEmotions.length,
      notes: notedChecks,
    },
    habitsDone: habitRows.reduce((s, r) => s + r.done, 0),
    habitsScheduled: habitRows.reduce((s, r) => s + r.scheduled, 0),
    highlight: pickHighlight({ wEmotions, wChecks, habitRows, wCoping }),
  };
}

export function consistency(dayKeys, { checks, habits }) {
  const lastCheckByDay = new Map();
  for (const c of checks) {
    const k = keyOf(c.date);
    if (dayKeys.includes(k)) lastCheckByDay.set(k, c);
  }

  const rangeChecks = checks.filter((c) => dayKeys.includes(keyOf(c.date)));

  const energyCounts = ENERGY_LEVELS.map((lvl) => ({
    name: lvl.label,
    color: lvl.color,
    count: rangeChecks.filter((c) => Math.round(c.energy) === lvl.value).length,
  }));
  const maxEnergy = Math.max(...energyCounts.map((e) => e.count));
  const topEnergy = maxEnergy
    ? {
        names: energyCounts.filter((e) => e.count === maxEnergy).map((e) => e.name),
        count: maxEnergy,
      }
    : null;

  const habitRows = habits.map((h) => {
    const scheduled = scheduledKeys(h, dayKeys);
    const done = scheduled.filter((k) => h.completions.includes(k)).length;
    return {
      id: h.id,
      name: h.name,
      done,
      scheduled: scheduled.length,
      streak: computeStreak(h),
    };
  });

  return {
    lastCheckByDay,
    loggedDays: lastCheckByDay.size,
    checkCount: rangeChecks.length,
    energyCounts,
    topEnergy,
    habitRows,
  };
}

export function sensationBreakdown(checks, dayKeys) {
  const inRange = checks.filter((c) => dayKeys.includes(keyOf(c.date)));
  return SENSATIONS.map((s) => ({
    name: s.name,
    color: s.color,
    count: inRange.filter((c) => c.mood === s.name).length,
  })).filter((s) => s.count > 0);
}

export function emotionBreakdown(entries, dayKeys) {
  const inRange = entries.filter((e) => dayKeys.includes(keyOf(e.date)));
  return EMOTIONS.map((em) => ({
    name: em.name,
    color: em.color,
    count: inRange.filter((e) => e.emotion === em.name).length,
  })).filter((em) => em.count > 0);
}
