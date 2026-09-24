import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Dates from the API are always ISO-8601 UTC. Formatted with a FIXED locale and
// time zone so a server render and the browser's hydration of it cannot disagree
// (and so a test asserts one string rather than the runner's locale).
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

// The month-and-day half of a range whose year is said once at the end.
const monthDayFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

// A date range with the year said once when both ends share it — "Aug 1 – Sep 1,
// 2026" — and in full on each end when they don't. Same fixed locale/zone deal
// as formatDate.
export function formatDateRange(startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (start.getUTCFullYear() === end.getUTCFullYear()) {
    return `${monthDayFormatter.format(start)} – ${dateFormatter.format(end)}`;
  }
  return `${dateFormatter.format(start)} – ${dateFormatter.format(end)}`;
}

// An audit trail needs the time of day: several billing events can land in one
// day, and the date alone loses the order they happened in. UTC and a fixed
// locale for the same reason as above — and because a staffer comparing this to a
// log line is reading UTC there too.
const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export function formatDateTime(isoDate: string): string {
  return `${dateTimeFormatter.format(new Date(isoDate))} UTC`;
}

// The same instant for a reader working a queue rather than an audit trail. The
// waitlist is worked by people in Central time asking "did that come in this
// morning?", and an approval stamped 02:14 UTC reads to them as the evening
// before — so those columns say the time in the zone the staffer is in, and the
// UTC formatter above stays exactly as it is for everything joined to a log.
//
// An IANA zone rather than a fixed offset, so the label follows the
// daylight-saving switch on its own: CDT in September, CST in December. The
// components are spelled out because `timeZoneName` cannot be combined with
// `dateStyle`/`timeStyle`. The zone is still FIXED, like every formatter above,
// so a server render and its hydration cannot disagree.
const centralDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Chicago",
  timeZoneName: "short",
});

export function formatDateTimeCentral(isoDate: string): string {
  return centralDateTimeFormatter.format(new Date(isoDate));
}

// "How long ago", for the agent surfaces where recency is the question and the
// exact minute is not — a memory file, a context edit, a reported activity. The
// absolute timestamp goes on the element's `title` wherever this is used, so the
// precise time is still one hover away.
//
// It reads the clock, which would be a hydration hazard on server-rendered
// content; it is safe here because every caller renders data fetched by
// `callSessionOperation`, which only runs in the browser (see
// session-operation.ts) — a server render of those screens has no timestamps in
// it at all.
export function formatRelative(isoDate: string, now: number = Date.now()): string {
  const at = new Date(isoDate).getTime();
  if (Number.isNaN(at)) {
    return isoDate;
  }
  // Clamped at zero: a row written by an API host a few seconds ahead of this
  // browser must read "just now", never "in 3 seconds".
  const elapsedMinutes = Math.max(0, now - at) / 60_000;
  if (elapsedMinutes < 1) {
    return "just now";
  }
  if (elapsedMinutes < 60) {
    return `${Math.floor(elapsedMinutes)}m ago`;
  }
  const hours = elapsedMinutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)}h ago`;
  }
  const days = hours / 24;
  if (days < 30) {
    return `${Math.floor(days)}d ago`;
  }
  // Past a month "42d ago" stops meaning anything; the date is the better answer.
  return formatDate(isoDate);
}

// A byte count as a reader sizes a file: whole units, one decimal under 10 of
// them ("1.2 MB", "48 KB", "12 B"). Powers of 1024 rather than 1000, which is
// how the browser's own file pickers and the console's limits read.
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const rounded = value < 10 ? Math.round(value * 10) / 10 : Math.round(value);
  return `${rounded} ${units[unit]}`;
}

// Avatar fallback text. An invited member has no name yet — only the email the
// invitation was sent to — so the email case is the normal one, not an edge case.
export function initials(nameOrEmail: string): string {
  const name = nameOrEmail.trim();
  if (!name || name.includes("@")) {
    return name.slice(0, 1).toUpperCase() || "?";
  }
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.slice(0, 1).toUpperCase())
    .join("");
}
