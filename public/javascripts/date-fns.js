/**
 * Specific Functions from the DateFns without using the bundled
 *  version from: https://github.com/date-fns/date-fns/tree/main/src
 *
 */

const DateFns = {
  millisecondsInWeek: 604800000,
  getTimezoneOffsetInMilliseconds: (date) => {
    const utcDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      )
    );
    utcDate.setUTCFullYear(date.getFullYear());
    return date.getTime() - utcDate.getTime();
  },
  toDate: (argument) => {
    const argStr = Object.prototype.toString.call(argument);
    if (
      argument instanceof Date ||
      (typeof argument === "object" && argStr === "[object Date]")
    ) {
      return new argument.constructor(argument.getTime());
    } else if (typeof argument === "number" || argStr === "[object Number]") {
      return new Date(argument);
    } else {
      return new Date(NaN);
    }
  },
  startOfMonth: (dirtyDate) => {
    const date = DateFns.toDate(dirtyDate);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  },
  endOfMonth: (dirtyDate) => {
    const date = DateFns.toDate(dirtyDate);
    const month = date.getMonth();
    date.setFullYear(date.getFullYear(), month + 1, 0);
    date.setHours(23, 59, 59, 999);
    return date;
  },
  compareAsc: (dirtyDateLeft, dirtyDateRight) => {
    const dateLeft = DateFns.toDate(dirtyDateLeft);
    const dateRight = DateFns.toDate(dirtyDateRight);

    const diff = dateLeft.getTime() - dateRight.getTime();

    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1;
      // Return 0 if diff is 0; return NaN if diff is NaN
    } else {
      return diff;
    }
  },
  differenceInCalendarWeeks(dirtyDateLeft, dirtyDateRight) {
    const startOfWeekLeft = DateFns.startOfWeek(dirtyDateLeft);
    const startOfWeekRight = DateFns.startOfWeek(dirtyDateRight);

    const timestampLeft =
      startOfWeekLeft.getTime() -
      DateFns.getTimezoneOffsetInMilliseconds(startOfWeekLeft);
    const timestampRight =
      startOfWeekRight.getTime() -
      DateFns.getTimezoneOffsetInMilliseconds(startOfWeekRight);

    // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)
    return Math.round(
      (timestampLeft - timestampRight) / DateFns.millisecondsInWeek
    );
  },
  startOfWeek(dirtyDate) {
    const date = DateFns.toDate(dirtyDate);
    const day = date.getDay();

    date.setDate(date.getDate() - day);
    date.setHours(0, 0, 0, 0);
    return date;
  },
};
