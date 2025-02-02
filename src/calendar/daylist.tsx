import {dayToString, GregorianDate, gregorianDateToNewDate} from "./utils";
import React, {Component} from "react";


const startDate = new GregorianDate(2025, 1, 4)

export default class DayList extends Component<{}, {}>{
    constructor(props: {}) {
        super(props);
    }

    render() {
        const daystrings: string[] = [];

        for (let i = 0; i < 365; i++) {
            const gd = startDate.daysAfter(i);
            const d = gregorianDateToNewDate(gd);
            daystrings.push(dayToString(d.day));
        }

        const json = JSON.stringify(daystrings, null, 2)

        return (
            <div className='calendar-style'>
                <div className='container-fluid explanation'>
                    <div className='row'>
                        <div className='col-12'/>
                            <p onClick={() => navigator.clipboard.writeText(json)} style={{cursor: "pointer"}}>Copy</p>
                            <p>
                                <pre style={{color: "white"}}>
                                  {json}
                                </pre>
                            </p>
                    </div>
                </div>
            </div>
        );
    }
}
