import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  range,
  NewDate,
  gregorianDateToNewDate,
  dayToString,
  addDays,
} from "./utils";

export default class NewCalendarExplanation extends Component<{}, {}> {
  dateTable(startDate: Date, days: number, skipCondition: (d: NewDate) => boolean) {
    return (
      <div className='container-fluid'>
        {range(days).map(n => {
          let date = addDays(startDate, n);
          let newDate = gregorianDateToNewDate(date);

          if (skipCondition(newDate)) {
            return null
          }

          return <div key={n} className='row' style={{padding: 0}}>
            <div className="col-5 col-md-6">
              <p style={{textAlign: 'right'}}>
                {date.toDateString()}
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

              {this.dateTable(
                addDays(new Date(), -365),
                365*6 + 3,
                (d) => d.day.season !== -1
              )}

              <h3>Seasons and special days</h3>

              <p>
                The year is broken into the four standard seasons, each of which begins with an equinox or
                solstice. Because seasons are not the same in the northern and southern hemispheres,
                I have declined to officially label the seasons as "Spring", "Summer", "Autumn", and
                "Winter", and named the equinoxes and solstices "First" and "Second" rather than anything
                denoting a particular ecological season (although I obviously used colors and iconography suggestive of
                seasons in the temperate northern hemisphere in this web app - my cultural bias is showing!&nbsp;😠)
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

              <h3>Month names</h3>

              <p>
                I independently decided that I quite like the idea of a twelve-month year aligned with solstices
                and equinoxes, and subsequently decided that the clearest naming convention would be to use the
                predominant existing method of splitting the year in this way - the Western astrological zodiac.
                This is not meant to imply any particular relationship with horoscope or divination practices
                based on Western astrology.
              </p>

              <h3>The week</h3>

              <p>
                The 30-day months are split into five 6-day weeks. The weekdays are named after the five classical
                planets, plus "Sky"; the weekday names in order are:
                Skyday, Marsday, Mercuryday, Jupiterday, Venusday, Saturnday.
              </p>

              <h3>Extended calendar</h3>

              <p>
                Just for ease of reference, here's all days one year in the past and future:
              </p>

              {this.dateTable(
                addDays(new Date(), -365),
                365 * 2 + 1,
                _ => false
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
