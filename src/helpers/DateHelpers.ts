import { format as _format } from "date-fns";

export default class DateHelpers {
  format = (date: Date, format: string) => _format(date, format);

  getDaysInMonth = (date: Date) =>
    32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();

  getFormatedMonthRange = (dateInMonth: Date) => {
    const range = this.getMonthRange(dateInMonth);
    return {
      start: this.format(range.start, "YYYY-MM-DD"),
      end: this.format(range.end, "YYYY-MM-DD")
    };
  };

  getMonthRange = (dateInMonth: Date) => {
    const d1 = new Date(dateInMonth);
    const d2 = new Date(d1);
    d1.setDate(1);
    d2.setDate(this.getDaysInMonth(d1));
    return {
      start: d1,
      end: d2
    };
  };

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
