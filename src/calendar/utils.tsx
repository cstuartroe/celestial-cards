import Card, {SEASONS, Count} from "../Card";

export const range = (n: number) => Array.from(Array(n).keys());

export const WEEKDAYS = ['Skyday','Marsday','Mercuryday','Jupiterday','Venusday','Saturnday'];
export const HOLIDAYS = ['Spring Equinox','Summer Solstice','Autumn Equinox','Winter Solstice',];
export const MONTHS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
export const CELESTIAL_BODIES = ["moon", "sun", "star"] as const;

export const WEEKEND_DAYS = [0, 5];

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

    return `${gregorianWeekdays[date.getUTCDay()]} ${date.getUTCFullYear()} ${gregorianMonths[date.getUTCMonth()]} ${date.getUTCDate()}`;
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
  season: number, // -1 for NYD, 0 for spring, so on (-2 for leap day)
  month: number,   // -1 for solstice/equinox, 0-2 for regular month
  date: number,   // 0-29 inclusive
}

export function dayEq(day1: Day, day2: Day) {
  if (day1.season === -1) {
    return day2.season === -1;
  } else if (day1.month === -1) {
    return (day1.season === day2.season) && (day2.month === -1);
  } else {
    return (day1.season === day2.season) && (day1.month === day2.month) && (day1.date === day2.date);
  }
}

function isLeapYear(year: number) {
  return (year % 4 === 0) && ((year % 100 !== 0) || (year % 1000 === 0));
}

function dayOfYear(days: number, leapYear: boolean): Day {
  if (leapYear) {
    if (days === 183) {
      return {
        season: -2,
        month: -1,
        date: -1,
      }
    } else if (days > 183) {
      days--;
    }
  }

  let season = Math.floor((days - 1) / 91);
  let dayOfSeason = (days - 1) % 91;
  let month = Math.floor((dayOfSeason - 1) / 30);
  let date = (dayOfSeason - 1) % 30;

  return {
    season,
    month,
    date,
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

export function dayToString(day: Day) {
  if (day.season === -1) {
    return "New Years' Day";
  } else if (day.season === -2) {
    return "Leap Day";
  } else if (day.month === -1) {
    return HOLIDAYS[day.season];
  } else {
    return WEEKDAYS[day.date % 6] + " " + (day.date + 1).toString() + "\xa0"
      + MONTHS[day.season*3 + day.month];
  }
}

export function dayToCard(day: Day) {
  if (day.season === -1) {
    return <Card season={"spring"} count={1} shape={"moon"}/>;
  } else if (day.season === -2) {
    return <Card season={"autumn"} count={1} shape={"moon"}/>;
  } else if (day.month === -1) {
    return <Card season={SEASONS[day.season].toLowerCase() as any} count={1} shape={"moon"}/>;
  } else {
    const count = Math.floor(day.date/6) + 1 as Count
    return <Card season={SEASONS[day.season]} count={count} shape={CELESTIAL_BODIES[day.month]}/>;
  }
}
