import React, {Component} from "react";
import Card, {SEASONS, SHAPES, COUNTS} from "./Card";
import classNames from "classnames";

function crossProduct<S, T>(l1: readonly S[], l2: readonly T[]): [S, T][] {
    const out: [S, T][] = [];
    l1.forEach(s => {
        out.push(...l2.map(function (t: T): [S, T] {
            return [s, t];
        }))
    });
    return out;
}

type Props = {
    expandGames: () => void,
}

type State = {}

export default class Overview extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <>
                <h2>What are celestial cards?</h2>

                <p>
                    Celestial cards are simply a variety of playing
                    cards. In English-speaking regions of the world,
                    by far the most recognizable variety of playing
                    cards are{' '}
                    <a href="https://en.wikipedia.org/wiki/French-suited_playing_cards" target="_blank">
                        French-style cards
                    </a>,
                    but many others have been traditionally played
                    with throughout the world.
                </p>

                <p>
                    In most traditional varieties of playing cards,
                    the markings on the cards come in two dimensions,
                    typically number (e.g., 2 3 4 5 6 7 8 9 10 J Q K A)
                    and suit (e.g., ♠ ♥ ♣ ♦). Celestial cards are not a
                    traditional variety of playing cards, having been
                    invented in 2024, and are designed with
                    three-dimensional markings:
                </p>

                <h3>Celestial body (shape)</h3>

                <div className="row">
                    {SHAPES.map((shape, i) => (
                        <div className={classNames("col-2", {"offset-3": i === 0})} key={shape}>
                            <Card season={"spring"} count={1} shape={shape}/>
                            <div className="caption">{shape}</div>
                        </div>
                    ))}
                </div>

                <h3>Season (color)</h3>

                <div className="row">
                    {SEASONS.map((season, i) => (
                        <div className={classNames("col-2", {"offset-2": i === 0})} key={season}>
                            <Card season={season} count={1} shape={"moon"}/>
                            <div className="caption">{season}</div>
                        </div>
                    ))}
                </div>

                <h3>Number</h3>

                <div className="row">
                    {COUNTS.map(count => (
                        <div className={classNames("col-2", {"offset-1": count === 1})} key={count}>
                            <Card season={"spring"} count={count} shape={"moon"}/>
                            <div className="caption">{count}</div>
                        </div>
                    ))}
                </div>

                <p style={{textAlign: "center", padding: "3vh 0"}}>
                    A full deck of celestial cards looks like
                </p>

                {crossProduct(SEASONS, SHAPES).map(([season, shape]) => (
                    <div className="row" key={`${season} ${shape}`}>
                        {COUNTS.map(count => (
                            <div className={classNames("col-2", {"offset-1": count === 1})} key={count}>
                                <Card season={season} count={count} shape={shape}/>
                                <div className="caption">{count} {season} {shape}{count === 1 ? "" : "s"}</div>
                            </div>
                        ))}
                    </div>
                ))}

                <p>
                    The goal of this increased dimensionality is to allow for more complex game mechanics.
                    Also, since a deck of celestial cards has 3 × 4 × 5 = 60 cards, a highly composite number,
                    it is possible to split cards evenly amongst up to six players or piles, which
                    is useful for many games.
                </p>

                <h2>What types of games can I play with celestial cards?</h2>

                <p>
                    Broadly, celestial cards are good for the same types of games as other familiar types of
                    playing cards. In fact, many popular playing card games have direct analogs in celestial
                    cards. There are also games which can be played with celestial cards but not with other
                    playing cards, many of which have a mathematical feel. For instance, a variant of the
                    popular game{' '}
                    <a href="https://en.wikipedia.org/wiki/Set_(card_game)" target="_blank">
                        Set
                    </a>
                    {' '}can be played with celestial cards, as well as games invented specifically for
                    celestial cards.
                </p>

                <p>
                    To get some ideas of games that can be played with celestial cards, see the{' '}
                    <span className="link" onClick={() => this.props.expandGames()}>
                        "Games"
                    </span>
                    {' '}section of the menu!
                </p>
            </>
        );
    }
}
