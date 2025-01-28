import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faFan, faWheatAwn, faCrow, faArrowsSpin, faFrog } from "@fortawesome/free-solid-svg-icons";
import {Season, SEASONS, Body} from "../Card";
import {
  range,
  Day,
  NewDate,
  CROSS_QUARTER_DAYS,
  MONTHS,
  gregorianDateToNewDate,
  dayName,
  dayToString,
  dayEq,
  GregorianDate,
  newDateToGregorianDate,
  isLeapYear,
  BODY_ORDER_BY_SEASON,
  PLANET_SYMBOLS,
  PLANETS,
  dayAndYearToJSX,
} from "./utils";
import classNames from "classnames";

const MONTH_SYMBOLS = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];
const SEASON_ICONS = [faSeedling, faFan, faWheatAwn, faCrow];

type CalendarColor = Season | "white" | "black";

type CalendarElement = {
  season: CalendarColor,
  jsx: JSX.Element,
}

function seasonStyle(season: CalendarColor) {
  if (SEASONS.includes(season as Season)) {
    return {
      backgroundImage: `url(/static/img/blank_${season}.png)`,
      backgroundSize: '1000px',
    };
  }

  return {};
}

function renderCalendarElements(elements: CalendarElement[]) {
  const elementGroups: {
    season: CalendarColor,
    elements: JSX.Element[],
  }[] = [];

  elements.forEach(element => {
    if (elementGroups.length === 0 || element.season !== elementGroups[elementGroups.length - 1].season) {
      elementGroups.push({elements: [], season: element.season});
    }
    elementGroups[elementGroups.length - 1].elements.push(element.jsx);
  });

  return elementGroups.map((group, i) => (
      <div
          key={i}
          style={seasonStyle(group.season)}
          className={classNames(
              "col-12", "calendar-section", `season-${group.season}`,
              {first: i === 0, last: i === elementGroups.length - 1},
          )}
      >
        {group.elements.map((e, i) => (
          <div className="calendar-element" key={i}>
            {e}
          </div>
        ))}
      </div>
  ));
}

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

  let weekday = (day.day_number - 1) % 6;
  if (day.quarter < 0) {
    weekday = 5;
  } else if (day.day_number === 0) {
    weekday = (day.quarter % 2 === 0) ? 5 : 0;
  }

  let className = PLANETS[weekday].toLowerCase() + "day";
  if (dayEq(day, currentDay)) {
    className += " activeDay";
  } else if (name !== null) {
    className += " holiday"
  }

  className += " day-square";

  let content: string | JSX.Element = PLANET_SYMBOLS[weekday];
  if (day.quarter === -1) {
    content = <FontAwesomeIcon icon={faArrowsSpin}/>;
  } else if (day.quarter === -2) {
    content = <FontAwesomeIcon icon={faFrog}/>;
  } else if (day.day_number === 0) {
    content = <FontAwesomeIcon icon={SEASON_ICONS[day.quarter]}/>;
  }

  const currentYear = gregorianDateToNewDate(GregorianDate.localToday()).year;
  let yearAdjusts = [-1, 0, 1];
  if (day.quarter === -2) {
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
              year: 5341,
            });

            window.open(`/calendar/birthday?date=${earlyGregorianDate.getISO()}`, '_blank');
          }}
      >
        <div className="date-tooltip">
          <p className="day-name">{name || dayToString(day)}</p>
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

function monthElements(quarter: number, month: number, currentDay: Day): CalendarElement[] {
  const monthNumber = quarter*3 + month;
  const title = <span>{MONTHS[monthNumber]} {MONTH_SYMBOLS[monthNumber]}</span>;
  const season = SEASONS[quarter]
  const body = BODY_ORDER_BY_SEASON[season][month % 3];

  return [
    {
      season,
      jsx: <h2>{title}</h2>
    },
    {
      season,
      jsx: (
        <table className="solar-term">
          <tbody>
          {range(5).map(w => (
              <tr key={w} className="d-flex flex-row">
                {CelestialImage(body, w + 1)}
                {range(6).map(d => (
                    <th key={d} className="flex-fill">
                      <DaySquare day={{quarter, day_number: month * 30 + w * 6 + d + 1}} currentDay={currentDay}/>
                    </th>
                ))}
                {CelestialImage(body, w + 1)}
              </tr>
          ))}
          </tbody>
        </table>
      )
    },
  ];
}

type SpecialDayProps = {
  day: Day,
  currentDay: Day,
}

function SpecialDay(props: SpecialDayProps) {
  const {day, currentDay} = props;

  return (
    <table className='solar-term'>
      <tbody>
      <tr>
        <th>
          <DaySquare day={day} currentDay={currentDay}/>
        </th>
      </tr>
      </tbody>
    </table>
  );
}

function specialDayElements(quarter: number, currentDay: Day): CalendarElement[] {
  const season = "black";
  const day = {quarter, day_number: 0};
  return [
    {
      season,
      jsx: <h2>{dayName(day)}</h2>
    },
    {
      season,
      jsx: <SpecialDay day={day} currentDay={currentDay}/>,
    },
  ]
}

function quarterElements(quarter: number, currentDay: Day): CalendarElement[] {
  const cross_quarter_season = (quarter % 2 === 0) ? "black" : "white";
  const out: CalendarElement[] = [
    {
      season: cross_quarter_season,
      jsx: <h2>{CROSS_QUARTER_DAYS[quarter]}</h2>,
    },
    {
      season: cross_quarter_season,
      jsx: <SpecialDay day={{quarter, day_number: 0}} currentDay={currentDay}/>,
    },
  ];

  for (let i = 0; i < 3; i++) {
    out.push(...monthElements(quarter, i, currentDay));
  }

  return out;
}

export default class NewCalendar extends Component<{}, NewDate> {
  private __is_mounted: boolean;

  constructor(props: {}) {
    super(props);
    this.__is_mounted = false;
    this.state = {
      day: { quarter: -1, day_number: 0 },
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

  render() {
    const elements: CalendarElement[] = [];
    elements.push(...specialDayElements(-1, this.state.day));
    [0, 1].forEach(quarter => {
      elements.push(...quarterElements(quarter, this.state.day));
    });
    if (isLeapYear(this.state.year)) {
      elements.push(...specialDayElements(-2, this.state.day));
    }
    [2, 3].forEach(quarter => {
      elements.push(...quarterElements(quarter, this.state.day));
    });

    return (
      <div className={'calendar-style'}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <h1 id='current'>
                today is
                <br/>
                {dayAndYearToJSX(this.state)}
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

            <div className="col-12 col-md-6 offset-md-3 calendar-wrapper">
              {renderCalendarElements(elements)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
