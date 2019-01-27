export class DateUtils {

  public static toYYYYMMDD(date: Date): string {
    return date.getUTCFullYear() + '' +
      ("0" + (date.getUTCMonth() + 1)).slice(-2) + '' +
      ("0" + (date.getUTCDate())).slice(-2);
  }
}