import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faSun, faLeaf, faSnowflake, faGlassCheers, faFrog } from "@fortawesome/free-solid-svg-icons";
import {Season, SEASONS} from "../Card";
import {
  range,
  Day,
  NewDate,
  FIRST_DAYS,
  MONTHS,
  gregorianDateToNewDate,
  dayName,
  dayToString,
  dayEq,
  GregorianDate,
  newDateToGregorianDate, isLeapYear,
} from "./utils";
import classNames from "classnames";

const MONTH_SYMBOLS = ['♈︎', '♉︎', '♊︎', '♋︎', '♌︎', '♍︎', '♎︎', '♏︎', '♐︎', '♑︎', '♒︎', '♓︎'];
const SEASON_ICONS = [faCloud, faSun, faLeaf, faSnowflake];
const ORDINALS = [<span>1<sup>st</sup></span>, <span>2<sup>nd</sup></span>];

type CalendarColor = Season | "white" | "black";

type CalendarElement = {
  season: CalendarColor,
  jsx: JSX.Element,
}

function seasonStyle(season: CalendarColor) {
  if (SEASONS.includes(season as Season)) {
    return {
      backgroundImage: `url(/static/img/blank_${season}.png)`,
      backgroundSize: 'contain',
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

function DaySquare(props: { day: Day, currentDay: Day }) {
  let { day, currentDay } = props;

  const name = dayName(day);

  let className = "weekday";
  if (dayEq(day, currentDay)) {
    className = 'activeDay';
  } else if (name !== null) {
    className = "holiday"
  } else if (day.quarter === -1 || day.day_number === 0) {
    className = "weekend";
  }

  className += " day-square";

  let content: string | JSX.Element = (((day.day_number - 1) % 15) + 1).toString();
  if (day.quarter === -1) {
    content = <FontAwesomeIcon icon={faGlassCheers}/>;
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

function solarTerm(quarter: number, term: number, currentDay: Day): CalendarElement[] {
  const monthNumber = quarter*3 + Math.floor(term/2);
  const title = <span>{ORDINALS[term % 2]} {MONTHS[monthNumber]} {MONTH_SYMBOLS[monthNumber]}</span>;
  const season = SEASONS[(quarter + Math.floor(term/3)) % 4]

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
          {range(3).map(w => (
              <tr key={w} className="d-flex flex-row">
                {range(5).map(d => (
                    <th key={d} className="flex-fill">
                      <DaySquare day={{quarter, day_number: term * 15 + w * 5 + d + 1}} currentDay={currentDay}/>
                    </th>
                ))}
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
  const season = quarter === -1 ? "spring" : "autumn";
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
  const out: CalendarElement[] = [
    {
      season: SEASONS[quarter],
      jsx: <h2>{FIRST_DAYS[quarter]}</h2>,
    },
    {
      season: SEASONS[quarter],
      jsx: <SpecialDay day={{quarter, day_number: 0}} currentDay={currentDay}/>,
    },
  ];

  for (let i = 0; i < 6; i++) {
    out.push(...solarTerm(quarter, i, currentDay));
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

            <div className="col-12 col-md-6 offset-md-3 calendar-wrapper">
              {renderCalendarElements(elements)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
