import {SEASONS, Count, Card} from "../Card";

export const range = (n: number) => Array.from(Array(n).keys());

export const WEEKDAYS = ['Saturnday','Marsday','Mercuryday','Jupiterday','Venusday'];
export const FIRST_DAYS = ['Spring Equinox','Summer Solstice','Autumn Equinox','Winter Solstice',];
export const MIDSEASON_DAYS = ["Beltane", "Lunasa", "Samhain", "Imbolc"];
export const MONTHS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
export const CELESTIAL_BODIES = ["moon", "sun", "star"] as const;

export type Body = (typeof CELESTIAL_BODIES)[number];

export const BODY_ORDER_BY_SEASON: Body[][] = [
  ["star", "moon", "sun"],
  ["sun", "moon", "star"],
  ["sun", "moon", "star"],
  ["star", "moon", "sun"],
];

function padZeros(n: number): string {
  let out = n.toString();
  if (out.length < 2) {
    out = "0" + out;
  }
  return out;
}

const gregorianWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const gregorianMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export class GregorianDate {
  date: Date

  constructor(year: number, month: number, date: number) {
    // year is full year. month is 0-11. date is 1-31.
    this.date = new Date(`${year}-${padZeros(month + 1)}-${padZeros(date)}T00:00:00+0000`)
  }

  getYear() {
    return this.date.getUTCFullYear();
  }

  getMonth() {
    return this.date.getUTCMonth();
  }

  getDate() {
    return this.date.getUTCDate();
  }

  getTime() {
    return this.date.getTime();
  }

  getISO() {
    return `${this.getYear()}-${padZeros(this.getMonth() + 1)}-${padZeros(this.getDate())}`;
  }

  daysAfter(days: number) {
    const out = new GregorianDate(0, 0, 0);
    out.date.setTime(this.date.getTime() + days*24*60*60*1000)
    return out;
  }

  difference(other: GregorianDate) {
    return (this.getTime() - other.getTime()) / (24*60*60*1000);
  }

  toString() {
    const {date} = this;

    return `${gregorianWeekdays[date.getUTCDay()]} ${gregorianMonths[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`;
  }

  static localToday() {
    const now = new Date();
    return new GregorianDate(now.getFullYear(), now.getMonth(), now.getDate());
  }

  static UTCToday() {
    const now = new Date();
    return new GregorianDate(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  }
}

export const NEW_YEARS_DAYS: [GregorianDate, number][] = [
    [new GregorianDate(1800, 2, 22), 5146],
    [new GregorianDate(1900, 2, 22), 5246],
    [new GregorianDate(1950, 2, 21), 5296],
    [new GregorianDate(1990, 2, 21), 5336],
    [new GregorianDate(2016, 2, 21), 5362],
];


export type Day = {
  quarter: number, // -1 for NYD, 0 for northern hemisphere spring, so on (-2 for leap day)
  day_number: number, // 0 for solstice/equinox, 1-90 inclusive otherwise
}

export function dayEq(day1: Day, day2: Day) {
  if (day1.quarter < 0) {
    return day2.quarter === day1.quarter;
  } else {
    return (day1.quarter === day2.quarter) && (day1.day_number === day2.day_number);
  }
}

export function isLeapYear(year: number) {
  return (year % 4 === 0) && ((year % 100 !== 0) || (year % 1000 === 0));
}

export function maxMod(n: number, mod: number) {
  // Like mod, but e.g. maxMod(60, 30) is 30, not 0
  return ((n - 1) % mod) + 1;
}

function dayOfYear(days: number, leapYear: boolean): Day {
  // If days == 0, it's nyd. If days == 1, it's first equinox, and so on.
  if (leapYear) {
    if (days === 183) {
      return {
        quarter: -2,
        day_number: 0,
      }
    } else if (days > 183) {
      days--;
    }
  }

  if (days === 0) {
    return {
      quarter: -1,
      day_number: 0,
    };
  } else {
    days--;
  }

  let quarter = Math.floor(days / 91);
  let day_number = days % 91;

  return {
    quarter,
    day_number,
  }
}

export type NewDate = {
  day: Day,
  year: number,
}

export function gregorianDateToNewDate(date: GregorianDate): NewDate {
  let i = NEW_YEARS_DAYS.length - 1;
  while (NEW_YEARS_DAYS[i][0].getTime() > date.getTime()) {
    i--;
  }

  let [nyd, year] = NEW_YEARS_DAYS[i];

  while (true) {
    let next_nyd = nyd.daysAfter(365);

    if (isLeapYear(year)) {
      next_nyd = next_nyd.daysAfter(1);
    }

    if (next_nyd.getTime() > date.getTime()) {
      return {
        year: year,
        day: dayOfYear(date.difference(nyd), isLeapYear(year))
      };
    } else {
      nyd = next_nyd;
      year++;
    }
  }
}

export function newDateToGregorianDate(date: NewDate): GregorianDate {
  let out: GregorianDate = new GregorianDate(date.year - 3346, 2, 18);
  if (date.day.quarter > 0) {
    out = out.daysAfter(91 * date.day.quarter);
  }
  out = out.daysAfter(date.day.day_number);

  while (!dayEq(gregorianDateToNewDate(out).day, date.day)) {
    out = out.daysAfter(1);
  }

  return out;
}

export function dayName(day: Day): string | null {
  if (day.quarter === -1) {
    return "New Years' Day";
  }

  if (day.quarter === -2) {
    return "Leap Day";
  }

  if (day.day_number === 0) {
    return FIRST_DAYS[day.quarter];
  }

  if (day.day_number === 46) {
    return MIDSEASON_DAYS[day.quarter];
  }

  return null;
}

export function dayToString(day: Day) {
  const name = dayName(day);
  if (name !== null) {
    return name;
  }

  return WEEKDAYS[(day.day_number - 1) % 5] + " " + maxMod(day.day_number, 30).toString() + "\xa0"
    + MONTHS[day.quarter*3 + Math.floor((day.day_number - 1) / 30)];
}

export function dayToCard(day: Day): Card {
  if (day.quarter === -1) {
    return {season: "spring", count: 1, shape: "star"};
  } else if (day.quarter === -2) {
    return {season: "autumn", count: 1, shape: "sun"};
  } else if (day.day_number === 0) {
    return {season: SEASONS[day.quarter], count: 1, shape: BODY_ORDER_BY_SEASON[day.quarter][0]};
  } else {
    const count = maxMod(day.day_number, 5) as Count
    return {season: SEASONS[day.quarter], count: count, shape: BODY_ORDER_BY_SEASON[day.quarter][Math.floor((day.day_number - 1) / 30)]};
  }
}
