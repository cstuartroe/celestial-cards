import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  range,
  NewDate,
  GregorianDate,
  gregorianDateToNewDate,
  dayToString,
} from "./utils";

export function   dateTable(startDate: GregorianDate, days: number, skipCondition: (d: NewDate) => boolean) {
  return (
      <div className='container-fluid'>
        {range(days).map(n => {
          let date = startDate.daysAfter(n);
          let newDate = gregorianDateToNewDate(date);

          if (skipCondition(newDate)) {
            return null
          }

          return <div key={n} className='row' style={{padding: 0}}>
            <div className="col-5 col-md-6">
              <p style={{textAlign: 'right'}}>
                {date.toString()}
              </p>
            </div>
            <div className="col-7 col-md-6">
              <p>
                {dayToString(newDate.day)}
                {' '}
                {newDate.year}
              </p>
            </div>
          </div>
        })
        }
      </div>
  );
}

export default class NewCalendarExplanation extends Component<{}, {}> {
  render() {
    return (
      <div className={'calendar-style'}>
        <div className='container-fluid explanation'>
          <div className='row'>
            <div className='col-0 col-sm-1 col-md-2 col-lg-3'/>
            <div className='col-12 col-sm-10 col-md-8 col-lg-6'>
              <h2 className='heading'>So what's up with this funky calendar?</h2>
              <p style={{textAlign: 'center'}}>
                <Link to={'/calendar'}>back to calendar</Link>
              </p>
              <h3>Years</h3>

              <p>
                Years begin around the March equinox, on March 20, 21, or 22 of the
                Gregorian calendar. Year 1 in this calendar would have begun in March of
                3346 BCE, a fairly random year I picked because it's around the advent of
                written history. Here are the New Years' Days for the current and next five years:
              </p>

              {dateTable(
                GregorianDate.localToday().daysAfter(-366),
                365*6 + 3,
                (d) => d.day.quarter !== -1
              )}

              <h3>Seasons and special days</h3>

              <p>
                The year is broken into the four standard seasons, each of which begins with an equinox or
                solstice. This calendar is labeled and aligned explicitly according to the seasons of the
                temperate northern hemisphere, while acknowledging that this does not describe
                climate patterns in other parts of the world.
              </p>

              <p>
                Seasons each begin with an equinox or solstice and then have three 30-day months, adding to 91 days.
                These four 91-day seasons plus a single New Years' Day (falling the day before the First Equinox) add
                to 365 days.
              </p>

              <p>
                This calendar has leap years with the same rules as the Gregorian calendar - if the year number
                is divisible by 4, unless it is divisible by 100, unless it is divisible by 1000. The leap day
                is inserted halfway through the year, just before the second equinox.
              </p>

              <p>
                I've also marked{' '}
                <a href="https://en.wikipedia.org/wiki/Quarter_days#In_Ireland" target="_blank">quarter days</a>
                {' '}on the 12th day of the second month of every season, labeling them with the Irish names. I've
                used the 12th rather than the exact middle of the season in order to line up more with traditionally
                used dates on the Gregorian calendar (although they still don't line up exactly, especially Beltane),
                and so that the holidays fall on a weekend day.
              </p>

              <h3>Month names</h3>

              <p>
                I independently decided that I quite like the idea of a twelve-month year aligned with solstices
                and equinoxes, and subsequently decided that the clearest naming convention would be to use the
                predominant existing method of splitting the year in this way - the Western astrological zodiac.
                This is not meant to imply any particular relationship with horoscope or divination practices
                based on Western astrology.
              </p>

              <p>
                Within each season, each of the three months is associated with a different celestial shape:
                sun, moon, or star. The month associated with the sun is the one closest to the longest day
                of the year. Stars, being only visible at night, are associated with the shortest day of the year,
                and thus are opposite the sun month. The moon can appear both during the day and at night and
                moves independently of the sun, and thus the middle month of each season is associated with
                the moon.
              </p>

              <h3>The week</h3>

              <p>
                The 30-day months are split into five 6-day weeks. The weekdays are named after the five classical
                planets, plus "Sky"; the weekday names in order are:
                Skyday, Marsday, Mercuryday, Jupiterday, Venusday, Saturnday.
              </p>

              <p>
                The planets in that order - Mars, Mercury, Jupiter, Venus, and Saturn - are associated with the
                days Tuesday through Saturday in traditional European, South Asian, and East Asian calendars,
                so I'm merely preserving that order. "Skyday" can be though of as a merger of Sunday and Monday,
                and its name is inspired by the Chinese term{' '}
                <a href="https://en.wiktionary.org/wiki/%E9%80%B1%E5%A4%A9#Chinese">週天</a>.
              </p>

              <p>
                Skyday and Saturnday are marked as the weekend days.
              </p>

              <h3>Extended calendar</h3>

              <p>
                Just for ease of reference, here's all days two years in the past and future:
              </p>

              {dateTable(
                  GregorianDate.localToday().daysAfter(-365*2 - 1),
                365 * 4 + 2,
                _ => false
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
