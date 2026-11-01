export function formatDate(value: string | Date): string {
  const d = value instanceof Date ? value : new Date(String(value) + "T00:00:00");
  if (isNaN(d.getTime())) return "";
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return d.toLocaleDateString("en-GB", opts).replace(/ /g, "\u00a0");
}
