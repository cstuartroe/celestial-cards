import React, {Component} from "react";
import {Link} from "react-router-dom";


import {gregorianDateToNewDate, dayToCard, GregorianDate, dayEq, dayAndYearToJSX} from "./utils";
import {dateTable} from "./explanation";
import CardImage from "../Card";


type State = {
    date: string,
}

export default class NewCalendarBirthdayViewer extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        const q = new URLSearchParams(window.location.search);
        this.state = {
            date: q.get("date") || "2000-01-01",
        };
    }

    dateDisplay() {
        const datetime = new Date(this.state.date + "T00:00:00+0000");
        const date = new GregorianDate(datetime.getUTCFullYear(), datetime.getUTCMonth(), datetime.getUTCDate());
        const newDate = gregorianDateToNewDate(date);

        return (
            <>
                <p style={{textAlign: 'center'}}>
                    {dayAndYearToJSX(newDate)}
                </p>
                <CardImage {...dayToCard(newDate.day)} bigger/>
                <p>These are all your celestial birthdays up to your 100th:</p>
                {dateTable(
                    date,
                    365.25*100 + 10,
                    d => !dayEq(d.day, newDate.day),
                )}
            </>
        );
    }

    setDate(date: string) {
        const url = new URL(window.location.href);
        url.searchParams.set("date", date);
        window.history.pushState(null, "", url.href);

        this.setState({date});
    }

    render() {
        const q = new URLSearchParams(window.location.search);

        return (
            <div className={'calendar-style'}>
                <div className='container-fluid explanation'>
                    <div className='row'>
                        <div className='col-0 col-sm-1 col-md-2 col-lg-3'/>
                        <div className='col-12 col-sm-10 col-md-8 col-lg-6'>
                            <h2 className='heading'>Find out your birthday card</h2>
                            <p style={{textAlign: 'center'}}>
                                <Link to={'/overview'}>back to overview</Link>
                                {' | '}
                                <Link to={'/calendar'}>see full calendar</Link>
                            </p>

                            <p>
                                Every week of the year has a distinct card of the deck associated with it.
                                Select your birthday (or any other date, I won't know)
                                to see its date in the celestial calendar and
                                which card is your birthday card.
                            </p>

                            <input type="date" id="start" name="trip-start" value={this.state.date} min="1601-01-01"
                                   max="2300-12-31"
                                   style={{marginTop: "2vh"}}
                                   onChange={e => this.setDate(e.target.value)} />

                            {q.get("date") && this.dateDisplay()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}