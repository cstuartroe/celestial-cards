import React, {Component} from "react";
import classNames from "classnames";

export const SEASONS = ["spring", "summer", "autumn", "winter"] as const;
export const BODIES = ["sun", "moon", "star"] as const;
export const COUNTS = [1, 2, 3, 4, 5] as const;

export type Season = (typeof SEASONS)[number];
export type Body = (typeof BODIES)[number];
export type Count = (typeof COUNTS)[number];

export type CardProps = [Count, Season, Body];

const season_numbers = {
    "spring": 0,
    "summer": 15,
    "autumn": 30,
    "winter": 45,
}

const shape_numbers = {
    "sun": 0,
    "moon": 5,
    "star": 10,
}

function padNumber(n: number) {
    if (n < 10) {
        return "0" + n;
    } else {
        return "" + n;
    }
}

export type Card = {
    season: Season,
    count: Count,
    shape: Body,
}

type Props = Card & {
    noPadding?: boolean,
    bigger?: boolean,
}

type State = {}

export default class CardImage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }


    render() {
        const {season, count, shape, noPadding, bigger} = this.props;

        const image_number = season_numbers[season] + shape_numbers[shape] + count;
        const src_uri = `/static/img/${padNumber(image_number)}_${season}_${count}_${shape}s.png`;

        return (
            <div className={classNames("celestial-card", {padded: !noPadding, bigger})}>
                <img
                    src={src_uri}
                    alt={`${count} ${season} ${shape}`}
                />
            </div>
        );
    }
}
