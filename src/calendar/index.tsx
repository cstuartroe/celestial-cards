import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faSun, faLeaf, faSnowflake, faGlassCheers, faFrog } from "@fortawesome/free-solid-svg-icons";
import {SEASONS} from "../Card";
import {
  range,
  Day,
  NewDate,
  WEEKEND_DAYS,
  FIRST_DAYS,
  MONTHS,
  CELESTIAL_BODIES,
  gregorianDateToNewDate,
  dayName,
  dayToString,
  dayEq,
  GregorianDate,
  newDateToGregorianDate,
  Body,
  BODY_ORDER_BY_SEASON,
} from "./utils";

const MONTH_SYMBOLS = ['♈︎', '♉︎', '♊︎', '♋︎', '♌︎', '♍︎', '♎︎', '♏︎', '♐︎', '♑︎', '♒︎', '♓︎'];
const SEASON_ICONS = [faCloud, faSun, faLeaf, faSnowflake];

function CelestialImage(body: Body, count: number) {
  return (
      <th className="flex-fill">
          <img
              src={`/static/img/blank_${count}_${body}s.png`}
              style={{
                width: "calc(2vw + 3vh)",
                margin: "2px",
              }}
              alt={`${count} ${body}s`}
          />
      </th>
  );
}

function DaySquare(props: { day: Day, currentDay: Day }) {
  let { day, currentDay } = props;

  const name = dayName(day);

  let className = "weekday";
  if (dayEq(day, currentDay)) {
    className = 'activeDay';
  } else if (name !== null) {
    className = "holiday"
  } else if (day.season === -1 || day.month === -1 || WEEKEND_DAYS.includes(day.date % 6)) {
    className = "weekend";
  }

  className += " day-square";

  let content: string | JSX.Element = (day.date + 1).toString();
  if (day.season === -1) {
    content = <FontAwesomeIcon icon={faGlassCheers}/>;
  } else if (day.season === -2) {
    content = <FontAwesomeIcon icon={faFrog}/>;
  } else if (day.month === -1) {
    content = <FontAwesomeIcon icon={SEASON_ICONS[day.season]}/>;
  }

  const currentYear = gregorianDateToNewDate(GregorianDate.localToday()).year;
  let yearAdjusts = [-1, 0, 1];
  if (day.season === -2) {
    yearAdjusts = [-4, 0, 4];
  }
  const days = yearAdjusts.map(yearsAdjust => newDateToGregorianDate({
    year: currentYear + yearsAdjust,
    day,
  }));

  return (
      <div
          className={className}
          style={{cursor: "pointer"}}
          onClick={() => {
            let earlyGregorianDate = newDateToGregorianDate({
              day,
              year: 5300,
            });

            window.open(`/calendar/birthday?date=${earlyGregorianDate.getISO()}`, '_blank');
          }}
      >
        <div className="date-tooltip">
          {name && <p className="holiday-name">{name}</p>}
          {days.map((d, i) => (
              <p key={i}>
                {d.toString()}
              </p>
          ))}
        </div>
        <p>{content}</p>
      </div>
  );
}

function Month(props: { season: number, month: number, currentDay: Day }) {
  let {season, month, currentDay} = props;
  const body = BODY_ORDER_BY_SEASON[season][month % 3];

  return (
      <table className="month">
        <tbody>
        {range(5).map(w => (
          <tr key={w} className="d-flex flex-row">
            {CelestialImage(body, w + 1)}
            {range(6).map(d => (
              <th key={d} className="flex-fill">
                <DaySquare day={{date: w*6 + d, season, month}} currentDay={currentDay}/>
              </th>
            ))}
            {CelestialImage(body, w + 1)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

type SeasonProps = {
  currentDay: Day,
  index: number,
}

function Season(props: SeasonProps) {
  let { currentDay, index } = props;

  return (
    <div className='col-12 col-md-6 season-wrapper'>
      <div className='season' id={SEASONS[index]} style={{
        backgroundImage: `url(/static/img/blank_${SEASONS[index]}.png)`,
        backgroundSize: 'contain',
      }}>
        <h2>{FIRST_DAYS[index]}</h2>
        <table className='month'>
          <tbody>
            <tr>
              <th>
                <DaySquare day={{season: index, month: -1, date: -1}} currentDay={currentDay}/>
              </th>
            </tr>
          </tbody>
        </table>
        {range(3).map(month => (
          <div key={month}>
            <h2>{MONTHS[index*3 + month]} {MONTH_SYMBOLS[index*3 + month]}</h2>
            <Month season={index} month={month} currentDay={currentDay}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default class NewCalendar extends Component<{}, NewDate> {
  private __is_mounted: boolean;

  constructor(props: {}) {
    super(props);
    this.__is_mounted = false;
    this.state = {
      day: { date: -1, season: -1, month: -1 },
      year: 0,
    }
  }

  componentDidMount() {
    this.__is_mounted = true;
    this.updateTime();
  }

  componentWillUnmount() {
    this.__is_mounted = false;
  }

  updateTime() {
    if (!this.__is_mounted) {
      return;
    }

    this.setState(gregorianDateToNewDate(GregorianDate.localToday()));
    setTimeout(this.updateTime.bind(this), 5000);
  }

  specialDay(season: number) {
    if (this.state.day.season === season) {
      let day = {
        season: season,
        month: -1,
        date: -1,
      };

      return (
        <div className='col-12 season-wrapper'>
          <div className='season' id='new-year'>
            <h2>{dayToString(day)}</h2>
            <table className='month'>
              <tbody>
              <tr>
                <th>
                  <DaySquare day={day} currentDay={this.state.day}/>
                </th>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className={'calendar-style'}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <h1 id='current'>
                today is{' '}
                {dayToString(this.state.day)}
                {'\xa0'}
                {this.state.year}
              </h1>
            </div>
            <div className='col-12 explanation'>
              <p style={{textAlign: 'center'}}>
                <Link to={'/overview'}>back to overview</Link>
                {' | '}
                <Link to={'/calendar/explanation'}>explanation</Link>
                {' | '}
                <Link to={'/calendar/birthday'}>birthday card</Link>
              </p>
            </div>

            {this.specialDay(-1)}
            {[0, 1].map(s => (
                <Season key={s} currentDay={this.state.day} index={s}/>
            ))}
            {this.specialDay(-2)}
            {[2, 3].map(s => (
              <Season key={s} currentDay={this.state.day} index={s}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
