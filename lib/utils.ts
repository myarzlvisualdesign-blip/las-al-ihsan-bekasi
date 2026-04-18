export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function toSentenceCase(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function parseKeywords(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function keywordsToInput(value: string[] | null | undefined) {
  return (value ?? []).join(", ");
}

export function formatBytes(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  const amount = value / 1024 ** exponent;

  return `${amount.toFixed(amount >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

export function buildWhatsAppUrl(number: string, message?: string) {
  const normalizedNumber = number.replace(/\D/g, "");
  const withCountryCode =
    normalizedNumber.startsWith("62")
      ? normalizedNumber
      : normalizedNumber.startsWith("0")
        ? `62${normalizedNumber.slice(1)}`
        : normalizedNumber;

  const text = message?.trim();

  return text
    ? `https://wa.me/${withCountryCode}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${withCountryCode}`;
}

export function safeJsonParse<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
