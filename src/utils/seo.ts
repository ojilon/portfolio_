export function fitDescription(value: string, maximum = 160): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= maximum) return clean;
  const shortened = clean.slice(0, maximum - 1).replace(/\s+\S*$/, "").trimEnd();
  return `${shortened}…`;
}
