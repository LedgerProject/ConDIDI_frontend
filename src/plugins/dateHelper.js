import { format } from "date-fns";
import { de, enUS } from "date-fns/locale";

export const getDateFormatted = (date, locale) => {
  // If the date is null we have to return an empty string,
  // because date-fns cant handle invalid data very well
  if (!date) return "";

  // Convert selected locale to date fns locale object
  if (locale === "de") {
    return format(date, "EEEE, MMMM do yyyy", {
      locale: de,
    });
  }
  return format(date, "EEEE, MMMM do yyyy", {
    locale: enUS,
  });
};
