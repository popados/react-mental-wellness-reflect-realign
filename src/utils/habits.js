import { addDays, dateKey } from "./dates";

export const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];
export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Habits saved before repeat days existed run every day.
export function habitDays(habit) {
  return habit.days && habit.days.length ? habit.days : ALL_DAYS;
}

export function isScheduledOn(habit, date) {
  return habitDays(habit).includes(date.getDay());
}

export function createdKey(habit) {
  return dateKey(new Date(habit.id));
}

export function isCompletedOn(habit, key = dateKey()) {
  return habit.completions.includes(key);
}

export function daysSummary(days) {
  const sorted = [...days].sort();
  const key = sorted.join(",");
  if (sorted.length === 7) return "Every day";
  if (key === "1,2,3,4,5") return "Weekdays";
  if (key === "0,6") return "Weekends";
  return sorted.map((d) => DAY_NAMES[d]).join(", ");
}

// Consecutive scheduled days completed, ending today. Unscheduled days are
// skipped rather than breaking the streak, and an unfinished today doesn't
// break it either, since the day isn't over.
export function computeStreak(habit) {
  const done = new Set(habit.completions);
  const created = createdKey(habit);
  let cursor = new Date();
  if (isScheduledOn(habit, cursor) && !done.has(dateKey(cursor))) {
    cursor = addDays(cursor, -1);
  }
  let streak = 0;
  for (let i = 0; i < 730; i++) {
    const key = dateKey(cursor);
    if (key < created && !done.has(key)) break;
    if (isScheduledOn(habit, cursor)) {
      if (!done.has(key)) break;
      streak++;
    }
    cursor = addDays(cursor, -1);
  }
  return streak;
}

// Scheduled days within `keys` that fall between the habit's creation and today.
export function scheduledKeys(habit, keys) {
  const created = createdKey(habit);
  const today = dateKey();
  return keys.filter((k) => {
    if (k < created || k > today) return false;
    const [y, m, d] = k.split("-").map(Number);
    return isScheduledOn(habit, new Date(y, m - 1, d));
  });
}

export function fmtHour(time) {
  const [h, m] = time.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

export function minutesOf(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function fmtClock(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
