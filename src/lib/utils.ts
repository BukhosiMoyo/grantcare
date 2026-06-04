import type { Locale } from "@/lib/site";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function formatDateLabel(date: string, locale: Locale = "en") {
  if (locale === "xh") {
    const parsedDate = new Date(`${date}T00:00:00`);
    const weekdays = ["Cawa", "Mvulo", "Lwesibini", "Lwesithathu", "Lwesine", "Lwesihlanu", "Mgqibelo"];
    const months = [
      "Januwari",
      "Februwari",
      "Matshi",
      "Epreli",
      "Meyi",
      "Juni",
      "Julayi",
      "Agasti",
      "Septemba",
      "Oktobha",
      "Novemba",
      "Disemba",
    ];

    return `${weekdays[parsedDate.getDay()]}, ${parsedDate.getDate()} ${months[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`;
  }

  const dateLocale = locale === "zu" ? "zu-ZA" : locale === "tn" ? "tn-ZA" : "en-ZA";

  return new Intl.DateTimeFormat(dateLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
