import { format as _format } from "date-fns";

export default class DateHelpers {
  normalize = (date: Date) =>
    new Date(date.getTime() - date.getTimezoneOffset() * -60000);

  normalizeAndFormat = (date: Date, format: string) =>
    _format(this.normalize(date), format);

  normalizeAndFormatForInput = (date: Date) =>
    this.normalizeAndFormat(date, "YYYY-MM-DD");
}
