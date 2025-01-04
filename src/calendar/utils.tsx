export const range = (n: number) => Array.from(Array(n).keys());

export const WEEKDAYS = ['Skyday','Marsday','Mercuryday','Jupiterday','Venusday','Saturnday'];
export const HOLIDAYS = ['First Equinox','First Solstice','Second Equinox','Second Solstice',];
export const SEASONS = ["Spring", "Summer", "Autumn", "Winter"];
export const MONTHS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

export const WEEKEND_DAYS = [0, 5];

function padZeros(n: number): string {
  let out = n.toString();
  if (out.length < 2) {
    out = "0" + out;
  }
  return out;
}

function gregorianDateToUTC(date: Date) {
  return new Date(`${date.getFullYear()}-${padZeros(date.getMonth() + 1)}-${padZeros(date.getDate())}T00:00:00+0000`);
}

export const FIRST_NEW_YEARS_DAY = new Date('1950-03-22T00:00:00+0000');
const FIRST_YEAR = 5296; // 22 Mar 1916 thru 21 March 1917

console.log(FIRST_NEW_YEARS_DAY);

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

export function addDays(date: Date, days: number) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function daysAfter(date1: Date, date2: Date) {
  return Math.floor((date1.getTime() - date2.getTime())/(1000*60*60*24));
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

export function gregorianDateToNewDate(date: Date): NewDate {
  let nyd = FIRST_NEW_YEARS_DAY, year = FIRST_YEAR;
  date = gregorianDateToUTC(date);
  console.log(date);
  console.log(nyd);

  while (true) {
    let next_nyd = addDays(nyd, 365);

    if (isLeapYear(year)) {
      next_nyd = addDays(next_nyd, 1);
    }

    if (next_nyd > date) {
      return {
        year: year,
        day: dayOfYear(daysAfter(date, nyd), isLeapYear(year))
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