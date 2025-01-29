import {Season, SEASONS, Body, Count, Card} from "../Card";

export const range = (n: number) => Array.from(Array(n).keys());

export const PLANETS = ['Sky','Jupiter','Venus','Mars','Mercury','Saturn'] as const;
type Planet = (typeof PLANETS)[number];
export const PLANET_SYMBOLS = ['🝰', '♃', '♀', '♂', '☿', '♄'];
export const QUARTER_DAYS = ['Spring Equinox','Summer Solstice','Autumn Equinox','Winter Solstice',];
export const CROSS_QUARTER_DAYS = ["Imbolc", "Beltane", "Lunasa", "Samhain"];
export const MONTHS = ["Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat",
  "Monkey", "Rooster", "Dog", "Pig", "Rat", "Ox"];
export const ZODIAC = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
export const CONSTELLATIONS = ["Pegasus", "Andromeda", "Pleiades", "Auriga", "Monoceros", "Hydra", "Corvus",
  "Centaurus", "Lupus", "Ophiuchus", "Aquila", "Delphinus"];

const ORDINALS = ["First", "Second", "Third", "Fourth", "Fifth"]

export const BODY_ORDER_BY_SEASON: {[key in Season]: Body[]} = {
  "spring": ["star", "moon", "sun"],
  "summer": ["moon", "sun", "star"],
  "autumn": ["sun", "moon", "star"],
  "winter": ["moon", "star", "sun"],
};

export const SEASONS_TO_PLANETS: {[key in Season]: Planet} = {
  "spring": "Jupiter",
  "summer": "Venus",
  "autumn": "Mars",
  "winter": "Mercury",
}

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

  yearsAfter(years: number) {
    return new GregorianDate(this.getYear() + years, this.getMonth(), this.getDate());
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

export function gregorianYearWithEra(year: number) {
  if (year <= 0) {
    return `${-year + 1} BCE`;
  } else {
    return `${year} CE`;
  }
}

export const FIRST_YEAR = -3346;
const NEW_YEARS_DAYS: GregorianDate[] = [
    new GregorianDate(1400, 1, 4),
    new GregorianDate(1600, 1, 5),
    new GregorianDate(1800, 1, 4),
    new GregorianDate(1900, 1, 5),
    new GregorianDate(1950, 1, 4),
    new GregorianDate(1990, 1, 4),
    new GregorianDate(2016, 1, 5),
];

// Chosen because ((128/4) - 1)/128 = .2421875 is very close to the fractional mean solar days in a mean tropical year
export const CYCLE_LENGTH = 128;
export const AGE_LENGTH = 12;

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

export function isGregorianLeapYear(year: number) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

export function isNewLeapYear(year: number) {
  if (year % 128 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
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

function getYearInCycle(year: number) {
  return maxMod(year, CYCLE_LENGTH)
}

function getCycleInAge(year: number) {
  return maxMod(Math.ceil(year / CYCLE_LENGTH), AGE_LENGTH);
}

function getAge(year: number) {
  return Math.ceil(year / (CYCLE_LENGTH * AGE_LENGTH))
}

export function ordinal(n: number) {
  let suffix: string = "";

  if ([11, 12].includes(n % 100)) {
    suffix = "th";
  } else {
    const lastDigit = (n%10) + "";
    switch (lastDigit) {
      case "1":
        suffix = "st"; break;
      case "2":
        suffix = "nd"; break;
      default:
        suffix = "th"; break;
    }
  }

  return <span>{n}<sup>{suffix}</sup></span>;
}

export function gregorianDateToNewDate(date: GregorianDate): NewDate {
  let i = NEW_YEARS_DAYS.length - 1;
  while (NEW_YEARS_DAYS[i].getTime() > date.getTime()) {
    i--;
  }

  let nyd = NEW_YEARS_DAYS[i];
  let year = nyd.getYear() - FIRST_YEAR;

  while (true) {
    let next_nyd = nyd.daysAfter(365);

    if (isNewLeapYear(year)) {
      next_nyd = next_nyd.daysAfter(1);
    }

    if (next_nyd.getTime() > date.getTime()) {
      return {
        year: year,
        day: dayOfYear(date.difference(nyd), isNewLeapYear(year))
      };
    } else {
      nyd = next_nyd;
      year++;
    }
  }
}

export function newDateToGregorianDate(date: NewDate): GregorianDate {
  let out: GregorianDate = new GregorianDate(date.year - 3346, 0, 29);
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
    return CROSS_QUARTER_DAYS[day.quarter];
  }

  const quarter_day_number = 43 + PLANETS.indexOf(SEASONS_TO_PLANETS[SEASONS[day.quarter]]);
  if (day.day_number === quarter_day_number) {
    return QUARTER_DAYS[day.quarter];
  }

  return null;
}

export function dayToString(day: Day) {
  const name = dayName(day);
  if (name !== null) {
    return name;
  }

  const dn = day.day_number - 1;
  return `the ${ORDINALS[Math.floor((dn % 30) / 6)]} ${PLANETS[dn % 6]}day of ${MONTHS[day.quarter*3 + Math.floor(dn / 30)]}-month`;
}

export function dayAndYearToJSX(d: NewDate): JSX.Element {
  return <span>
    {dayToString(d.day)}
    <br/>
    of the {ordinal(getYearInCycle(d.year))} year
    of the {ordinal(getCycleInAge(d.year))} cycle
    of the {ordinal(getAge(d.year))} age
  </span>
}

export function dayToCard(day: Day): Card {
  if (day.quarter === -1) {
    return {season: "spring", count: 1, shape: "star"};
  } else if (day.quarter === -2) {
    return {season: "autumn", count: 1, shape: "sun"};
  } else if (day.day_number === 0) {
    return {season: SEASONS[day.quarter], count: 1, shape: BODY_ORDER_BY_SEASON[SEASONS[day.quarter]][0]};
  } else {
    const count = Math.floor(((day.day_number - 1) % 30) / 6) + 1 as Count
    return {season: SEASONS[day.quarter], count: count, shape: BODY_ORDER_BY_SEASON[SEASONS[day.quarter]][Math.floor((day.day_number - 1) / 30)]};
  }
}

function gregorianDistribution(day: Day) {
  const result: {[key: string]: number} = {};

  const startYear = 1900 - FIRST_YEAR; // NEW_YEARS_DAYS[0].getYear() - FIRST_YEAR + 1;
  const numYears = 200;
  for (let year = startYear; year <= startYear + numYears; year++) {
    const gd = newDateToGregorianDate({day, year});
    const key = `${gd.getMonth() + 1}-${gd.getDate()}`;

    result[key] = (result[key] || 0) + 1;
  }

  const firstGregorianYear = NEW_YEARS_DAYS[0].getYear() + 1;
  const lastGregorianYear = firstGregorianYear + numYears;

  console.log(`Distribution of ${dayToString(day)} from Gregorian ${firstGregorianYear} to ${lastGregorianYear}:`)
  console.log(result);
}

// for (let quarter = -2; quarter <= 3; quarter++) {
//   gregorianDistribution({quarter, day_number: 0});
//
//   if (quarter >= 0) {
//     for (let day_number = 1; day_number <= 61; day_number += 30) {
//       gregorianDistribution({quarter, day_number});
//     }
//   }
// }
