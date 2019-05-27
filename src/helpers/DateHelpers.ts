import { format as _format } from "date-fns";

export default class DateHelpers {
  format = (date: Date, format: string) => _format(date, format);

  getDaysInMonth = (year: number, month: number) =>
    32 - new Date(year, month, 32).getDate();

  normalize = (date: Date) =>
    new Date(date.getTime() - date.getTimezoneOffset() * -60000);

  normalizeAndFormat = (date: Date, format: string) =>
    this.format(this.normalize(date), format);

  normalizeAndFormatForView = (date: Date) =>
    this.normalizeAndFormat(date, "DD-MMM-YYYY");

  normalizeAndFormatForInput = (date: Date) =>
    this.formatForInput(this.normalize(date));

  formatForInput = (date: Date) => _format(date, "YYYY-MM-DD");
}
