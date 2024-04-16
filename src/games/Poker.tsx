import React, {Component} from "react";
import Card, {CardProps, COUNTS} from "../Card";
import classNames from "classnames";

function PokerHand(props: { cards: [CardProps, CardProps, CardProps, CardProps, CardProps] }) {
    return (
        <div className="row">
            {props.cards.map(([count, season, shape], i) => (
                <div className={classNames("col-2", {"offset-1": i === 0})} key={i}>
                    <Card season={season} count={count} shape={shape}/>
                </div>
            ))}
        </div>
    );
}

type Props = {}

type State = {}

export default class Poker extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <>
                <h2>Poker</h2>

                <p>
                    Any poker variety can be adapted to celestial cards, with no changes to the rules governing
                    turn-taking and wagers. The only rule that must be adapted is the scoring of five-card hands.
                </p>

                <p>
                    Because celestial cards only have five numbers, a hand of five celestial cards must logically have
                    one of the following seven arrangements of numbers:
                </p>

                <h3>One pair</h3>

                <PokerHand cards={[
                    [1, "winter", "moon"],
                    [2, "spring", "sun"],
                    [2, "summer", "star"],
                    [3, "autumn", "moon"],
                    [5, "winter", "star"],
                ]}/>

                <div className="caption">
                    A pair of twos
                </div>

                <h3>Two pair</h3>

                <PokerHand cards={[
                    [1, "winter", "moon"],
                    [2, "spring", "sun"],
                    [2, "summer", "star"],
                    [3, "autumn", "moon"],
                    [3, "winter", "star"],
                ]}/>

                <div className="caption">
                    A pair of twos and a pair of threes
                </div>

                <h3>Three of a kind</h3>

                <PokerHand cards={[
                    [1, "winter", "moon"],
                    [2, "spring", "sun"],
                    [2, "summer", "star"],
                    [2, "autumn", "moon"],
                    [5, "winter", "star"],
                ]}/>

                <div className="caption">
                    Three twos
                </div>

                <h3>Full house</h3>

                <PokerHand cards={[
                    [2, "winter", "moon"],
                    [2, "spring", "sun"],
                    [3, "summer", "star"],
                    [3, "autumn", "moon"],
                    [3, "winter", "star"],
                ]}/>

                <div className="caption">
                    A pair of twos and three threes
                </div>

                <h3>Straight</h3>

                <PokerHand cards={[
                    [1, "winter", "moon"],
                    [2, "spring", "sun"],
                    [3, "summer", "star"],
                    [4, "autumn", "moon"],
                    [5, "winter", "star"],
                ]}/>

                <div className="caption">
                    One of each number
                </div>

                <h3>Four of a kind</h3>

                <PokerHand cards={[
                    [2, "winter", "moon"],
                    [2, "spring", "sun"],
                    [2, "summer", "star"],
                    [2, "autumn", "moon"],
                    [5, "winter", "star"],
                ]}/>

                <div className="caption">
                    Four twos
                </div>

                <h3>Five of a kind</h3>

                <PokerHand cards={[
                    [2, "winter", "moon"],
                    [2, "spring", "sun"],
                    [2, "summer", "star"],
                    [2, "autumn", "moon"],
                    [2, "winter", "star"],
                ]}/>

                <div className="caption">
                    Five twos
                </div>

                <p>
                    As surprising as it may seem, there are no "junk hands" that are not straights and do not have at
                    least one pair. This can be proven through the pigeonhole principle - with five numbers available
                    in a five-card hand, if there are no pairs, then all five numbers are represented once, constituting
                    a straight.
                </p>

                <p>
                    As a result, hands are scored as a whole, with each arrangement counting for a number of points:
                </p>

                <ul>
                    <li>One pair: 0 points</li>
                    <li>Two pair: 2 points</li>
                    <li>Three of a kind: 4 points</li>
                    <li>Full house: 6 points</li>
                    <li>Straight: 8 points</li>
                    <li>Four of a kind: 10 points</li>
                    <li>Five of a kind: 16 points</li>
                </ul>

                <p>
                    In addition, if all cards in the hand have the same shape, termed a "shape flush," then 11 points
                    are added to the score of the hand. If all cards in the hand have the same color, termed a "color
                    flush," then 15 points are added.
                </p>

                <p>
                    If all cards have the same color and shape, then this is termed a "double flush." A double flush
                    can logically only occur if the numbers are arranged in a straight, since all cards in the deck
                    are unique. This special hand is the highest-scoring hand in the game, worth 8 + 11 + 15 = 34
                    points. The odds of being randomly dealt a double flush are 1/455126, slightly better than the
                    1/649740 odds of being dealt a royal flush in standard poker.
                </p>

                <h3>Example hands</h3>

                <PokerHand cards={[
                    [1, "summer", "moon"],
                    [2, "winter", "sun"],
                    [2, "spring", "star"],
                    [3, "spring", "star"],
                    [3, "autumn", "moon"],
                ]}/>

                <div className="caption">
                    Two pair, worth 2 points.
                </div>

                <PokerHand cards={[
                    [1, "winter", "moon"],
                    [4, "autumn", "moon"],
                    [4, "autumn", "moon"],
                    [4, "spring", "moon"],
                    [5, "autumn", "moon"],
                ]}/>

                <div className="caption">
                    Three of a kind with shape flush, worth 4 + 11 = 15 points.
                </div>

                <PokerHand cards={[
                    [1, "winter", "moon"],
                    [2, "winter", "sun"],
                    [2, "winter", "star"],
                    [3, "winter", "star"],
                    [5, "winter", "moon"],
                ]}/>

                <div className="caption">
                    One pair with color flush, worth 0 + 15 = 15 points.
                </div>

                <PokerHand cards={[
                    [3, "spring", "star"],
                    [3, "summer", "star"],
                    [3, "autumn", "star"],
                    [3, "winter", "star"],
                    [5, "summer", "star"],
                ]}/>

                <div className="caption">
                    Four of a kind with shape flush, worth 10 + 11 = 21 points.
                    Tied for the third best hand in the game.
                </div>

                <PokerHand cards={[
                    [2, "summer", "moon"],
                    [2, "summer", "sun"],
                    [4, "summer", "sun"],
                    [4, "summer", "star"],
                    [4, "summer", "moon"],
                ]}/>

                <div className="caption">
                    Full house with color flush, worth 6 + 15 = 21 points.
                    Tied for the third best hand in the game.
                </div>

                <PokerHand cards={[
                    [1, "winter", "star"],
                    [2, "winter", "moon"],
                    [3, "winter", "moon"],
                    [4, "winter", "star"],
                    [5, "winter", "sun"],
                ]}/>

                <div className="caption">
                    Straight with color flush, worth 8 + 15 = 23 points.
                    The second best hand in the game.
                </div>

                <PokerHand cards={[
                    [1, "autumn", "sun"],
                    [2, "autumn", "sun"],
                    [3, "autumn", "sun"],
                    [4, "autumn", "sun"],
                    [5, "autumn", "sun"],
                ]}/>

                <div className="caption">
                    Red sun double flush, worth 34 points. Best hand in the game.
                </div>

                <h3>Breaking ties</h3>

                <p>
                    The winning hand of a round is usually simply that which scores the most points. However, if
                    two hands have the same score, then the winning hand is that with the lowest-number card in it.
                    If this is also a tie, then the second-lowest card of each hand is compared, and so on until
                    one hand has a lower card.
                </p>

                <PokerHand cards={[
                    [1, "summer", "moon"],
                    [2, "winter", "sun"],
                    [2, "spring", "star"],
                    [3, "spring", "star"],
                    [3, "autumn", "moon"],
                ]}/>

                <div className="caption">
                    The lowest-number card in this two-pair hand has 1 shape. The second-lowest card has 2.
                </div>

                <PokerHand cards={[
                    [1, "spring", "star"],
                    [1, "autumn", "moon"],
                    [3, "winter", "moon"],
                    [3, "autumn", "star"],
                    [5, "autumn", "moon"],
                ]}/>

                <div className="caption">
                    The lowest-number card in this two-pair hand has 1 shape. The second-lowest card also has 1,
                    so it would beat the first hand.
                </div>
            </>
        );
    }
}
