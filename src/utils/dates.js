export function dayOfYear(d) {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - start) / 86400000);
}

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function fmtDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function fmtWeekday(d) {
  return d.toLocaleDateString(undefined, { weekday: "long" });
}

// Local-calendar "YYYY-MM-DD" key; avoids the UTC shift of toISOString().
export function dateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

// Weeks run Sunday through Saturday.
export function startOfWeek(d = new Date()) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() - x.getDay());
  return x;
}

export function weekKeys(startKey) {
  const start = parseKey(startKey);
  return Array.from({ length: 7 }, (_, i) => dateKey(addDays(start, i)));
}

export function fmtWeekRange(startKey) {
  const start = parseKey(startKey);
  const end = addDays(start, 6);
  const month = (d) => d.toLocaleDateString(undefined, { month: "short" });
  const range =
    start.getMonth() === end.getMonth()
      ? `${month(start)} ${start.getDate()} – ${end.getDate()}`
      : `${month(start)} ${start.getDate()} – ${month(end)} ${end.getDate()}`;
  return end.getFullYear() === new Date().getFullYear()
    ? range
    : `${range}, ${end.getFullYear()}`;
}

export function lastNDayKeys(n) {
  const today = new Date();
  return Array.from({ length: n }, (_, i) => dateKey(addDays(today, i - n + 1)));
}
