import React, {Component} from "react";
import Card, {CardProps} from "../Card";
import classNames from "classnames";


function SetRow(props: { cards: [CardProps, CardProps, CardProps] }) {
    return (
        <div className="row">
            {props.cards.map(([count, season, shape], i) => (
                <div className={classNames("col-2", {"offset-3": i === 0})} key={i}>
                    <Card season={season} count={count} shape={shape}/>
                </div>
            ))}
        </div>
    );
}


type Props = {}

type State = {}

export default class SetGame extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <>
                <h2>Set</h2>

                <p>
                    A variant of the math game{' '}
                    <a href="https://en.wikipedia.org/wiki/Set_(card_game)" target="_blank">
                        Set
                    </a>
                    {' '}can be played with celestial cards. For players familiar with
                    that game, the following ruleset should be mostly familiar.
                </p>

                <p>
                    The game of set revolves around spotting the eponymous three-card "sets"
                    from amongst a larger array of cards face-up on the table. The dealer (typically
                    also a player) deals cards from a shuffled deck face-up into the center of the table
                    for all to see,
                    and players constantly scan the group in search of sets.
                </p>

                <p>
                    Upon finding a set,
                    a player will announce their claim by calling out "set!" and then pointing out
                    the three cards constituting the set. If the set is valid, they collect it
                    and add it to their pile to be scored at the end. If the set is invalid, they must
                    discard one of the sets they have already claimed, if they have any.
                </p>

                <p>
                    Whoever calls out "set!" first has the right to claim the set they see. In the case
                    of two players calling out near-simultaneously, it is up to the other players to
                    arbitrate whether a tie occurred. In the case of a tie, if the two players spotted
                    the same set or overlapping sets, all the cards in their sets are discarded. If two
                    players call out simultaneously or near-simultaneously but had spotted non-overlapping
                    sets, they may both collect their respective sets.
                </p>

                <p>
                    In the original Set, the dealer is instructed to maintain a minimum of twelve face-up
                    cards on the table at a time, and deal additional cards out three at a time in the
                    event that no sets are present amongst the twelve on the table. In the celestial
                    seasons cards variant of set, sets can be found among a smaller number of randomly
                    dealt cards on average, so it is recommended for the dealer to simply deal one card
                    at a time, waiting 5-20 seconds in between cards to allow players adequate time to
                    search for sets.
                </p>

                <p>
                    Eventually, the deck will run out of cards. At this point, players may take as long as
                    they want to continue searching for sets in the remaining face-up cards. Once all players
                    are convinced that no sets remain, players count the number of sets they have collected
                    over the course of the game; the winner is simply the player with the most sets.
                </p>

                <h3>What's in a set?</h3>

                <p>
                    A set is any three cards which are either <b>all alike</b> or <b>all different</b> in
                    each of the three traits: shape, color, and number. Put another way, there cannot be
                    two cards alike and one different with regard to any of the three traits.
                </p>

                <p>
                    For instance, the following is not a set because the first two cards both have two shapes on
                    them,
                    while the last card has three:
                </p>

                <SetRow cards={[
                    [2, "summer", "sun"],
                    [2, "summer", "moon"],
                    [3, "summer", "star"],
                ]}/>

                <p>
                    Whereas the following is a set, with cards all alike in color and number and different in shape:
                </p>

                <SetRow cards={[
                    [2, "summer", "sun"],
                    [2, "summer", "moon"],
                    [2, "summer", "star"],
                ]}/>

                <p>
                    Celestial card set also has one additional restriction which the original Set
                    does not have: for groups where the cards do not all have the same number, they must have
                    consecutive numbers. That is, while the following would be a set:
                </p>

                <SetRow cards={[
                    [1, "summer", "sun"],
                    [2, "summer", "moon"],
                    [3, "summer", "star"],
                ]}/>

                <p>
                    these three cards would not be a set, because 1, 2, and 4 are non-consecutive:
                </p>

                <SetRow cards={[
                    [1, "summer", "sun"],
                    [2, "summer", "moon"],
                    [4, "summer", "star"],
                ]}/>

                <h3>Example sets</h3>

                <p>
                    It can be difficult for a new player to grasp the concept of sets, and the quickest way to
                    understand is usually to see some examples. Examples will be given here of sets in order from
                    most traits shared in common to least.
                </p>

                <p>
                    A set where all three cards are alike in all three traits is impossible, because each card
                    is unique. That is, you could never find a set like the following, because it contains
                    duplicate cards!
                </p>

                <SetRow cards={[
                    [2, "summer", "sun"],
                    [2, "summer", "sun"],
                    [2, "summer", "sun"],
                ]}/>

                <p>
                    In contrast, sets where all three cards differ in only one trait are quite common, and
                    tend to be the easiest to spot. For instance, the following three cards are a set because
                    they are alike in all ways except shape:
                </p>

                <SetRow cards={[
                    [2, "summer", "sun"],
                    [2, "summer", "moon"],
                    [2, "summer", "star"],
                ]}/>

                <p>
                    These three are a set because they are alike in all ways except color:
                </p>

                <SetRow cards={[
                    [2, "spring", "sun"],
                    [2, "summer", "sun"],
                    [2, "winter", "sun"],
                ]}/>

                <p>
                    And lastly, these cards are also a set because they are alike in all ways except number, and
                    have
                    consecutive numbers:
                </p>

                <SetRow cards={[
                    [2, "summer", "sun"],
                    [3, "summer", "sun"],
                    [4, "summer", "sun"],
                ]}/>

                <p>
                    Remember that in celestial card set, numbers in a set must be consecutive if they are
                    not all alike, so the following is not a valid set:
                </p>

                <SetRow cards={[
                    [2, "summer", "sun"],
                    [3, "summer", "sun"],
                    [5, "summer", "sun"],
                ]}/>

                <p>
                    Moving on to sets in which only one trait is shared, the following is a set because the
                    cards are alike in shape, and different in color and different (and consecutive) in number:
                </p>

                <SetRow cards={[
                    [2, "summer", "sun"],
                    [3, "autumn", "sun"],
                    [4, "spring", "sun"],
                ]}/>

                <p>
                    These cards are a set because they are alike in color, with all different shapes and consecutive
                    numbers:
                </p>

                <SetRow cards={[
                    [3, "autumn", "moon"],
                    [4, "autumn", "star"],
                    [5, "autumn", "sun"],
                ]}/>

                <p>
                    These cards are a set because they are alike in number and all different in color and shape:
                </p>

                <SetRow cards={[
                    [4, "winter", "star"],
                    [4, "spring", "moon"],
                    [4, "summer", "sun"],
                ]}/>

                <p>
                    Sets in which the cards are different in all traits are the hardest to spot, so learning
                    to spot them can give you an advantage over your opponents. Some examples of some sets
                    with all different traits are as follows:
                </p>

                <SetRow cards={[
                    [1, "autumn", "moon"],
                    [2, "winter", "sun"],
                    [3, "summer", "star"],
                ]}/>

                <SetRow cards={[
                    [2, "summer", "moon"],
                    [3, "autumn", "star"],
                    [4, "spring", "sun"],
                ]}/>

                <SetRow cards={[
                    [3, "winter", "star"],
                    [4, "spring", "moon"],
                    [5, "autumn", "sun"],
                ]}/>

                <SetRow cards={[
                    [1, "summer", "sun"],
                    [2, "spring", "star"],
                    [3, "winter", "moon"],
                ]}/>

                <p>
                    Even for these, of course, numbers must be consecutive, so that the following rows are not
                    valid sets:
                </p>

                <SetRow cards={[
                    [1, "autumn", "moon"],
                    [2, "winter", "sun"],
                    [4, "summer", "star"],
                ]}/>

                <SetRow cards={[
                    [2, "summer", "moon"],
                    [3, "autumn", "star"],
                    [5, "spring", "sun"],
                ]}/>

                <SetRow cards={[
                    [1, "winter", "star"],
                    [4, "spring", "moon"],
                    [5, "autumn", "sun"],
                ]}/>

                <SetRow cards={[
                    [1, "summer", "sun"],
                    [2, "spring", "star"],
                    [5, "winter", "moon"],
                ]}/>
            </>
        );
    }
}
