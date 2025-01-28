import React, {Component} from "react";
import Card, {CardProps, Body} from "../Card";

type CardGridIcon = "right_arrow" | "left_arrow";

type CardGridCell = CardProps | null | CardGridIcon;

function CardGrid(props: { rows: (CardGridCell)[][] }) {
    const maxRowSize = props.rows.reduce(
        (size, row) => Math.max(row.length, size),
        0,
    );

    const flattenedCards: (CardGridCell)[] = props.rows.reduce(
        (cards, row) => [...cards, ...row],
        [],
    );

    return (
        <div style={{display: "grid", padding: "2vh 0"}}>
            <div style={{display: "inline-grid", margin: "auto", gridTemplateColumns: "auto ".repeat(maxRowSize)}}>
                {flattenedCards.map((cell, i) => {
                    switch (cell) {
                        case null:
                            return (
                                <div className="celestial-card">
                                    <img/>
                                </div>
                            );
                        case "right_arrow":
                        case "left_arrow":
                            return (
                                <div className="celestial-card">
                                    <img src={`/static/img/${cell}.png`} alt={cell}/>
                                </div>
                            );
                        default:
                            const [count, season, shape] = cell;
                            return <Card {...{count, season, shape}} key={i} noPadding/>;
                    }
                })}
            </div>
        </div>
    );
}

type Props = {}

type State = {}

export default class Tensor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <>
                <h2>Tensor</h2>

                <p>
                    Tensor is a complex strategy game for 2-6 players, developed specifically for celestial cards.
                    It centers around building so-called "tensors,"
                    groups of related cards, while stealing from your opponents and protecting your own cards from
                    theft.
                </p>

                <h3>What is a tensor?</h3>

                <p>
                    The most succinct definition of a tensor is a group of cards such that, given a list of one or more
                    shapes, a list of one or more colors, and a list of one or more numbers, every card that has some
                    combination of the listed attributes is included.
                </p>

                <p>
                    As a simple example, here is the tensor for the lists:
                </p>

                <ul>
                    <li>Shapes: star</li>
                    <li>Colors: red</li>
                    <li>Numbers: 4</li>
                </ul>

                <CardGrid rows={[
                    [
                        [4, 'autumn', 'star'],
                    ],
                ]}/>

                <p>
                    Get it? This tensor only contains one card, because there is only one card that is red and has 4
                    stars. In this case, each of the lists was only one item long. Let's see what happens if we put
                    two items into one of the lists:
                </p>

                <ul>
                    <li>Shapes: star</li>
                    <li>Colors: red</li>
                    <li>Numbers: 3, 4</li>
                </ul>

                <CardGrid rows={[
                    [
                        [3, 'autumn', 'star'],
                        [4, 'autumn', 'star'],
                    ],
                ]}/>

                <p>
                    Now, this tensor has two cards in it. In fact, the size of a tensor can always be calculated
                    by multiplying the size of its lists. In this case, the tensor has 1 × 1 × 2 = 2 cards in it.
                </p>

                <p>
                    Look at a few larger tensors:
                </p>

                <ul>
                    <li>Shapes: sun, moon</li>
                    <li>Colors: green, blue</li>
                    <li>Numbers: 1</li>
                </ul>

                <CardGrid rows={[
                    [
                        [1, 'spring', 'sun'],
                        [1, 'winter', 'sun'],
                    ],
                    [
                        [1, 'spring', 'moon'],
                        [1, 'winter', 'moon'],
                    ],
                ]}/>

                <ul>
                    <li>Shapes: sun, star</li>
                    <li>Colors: green</li>
                    <li>Numbers: 1, 4, 5</li>
                </ul>

                <CardGrid rows={[
                    [
                        [1, 'spring', 'sun'],
                        [4, 'spring', 'sun'],
                        [5, 'spring', 'sun'],
                    ],
                    [
                        [1, 'spring', 'star'],
                        [4, 'spring', 'star'],
                        [5, 'spring', 'star'],
                    ],
                ]}/>

                <ul>
                    <li>Shapes: moon</li>
                    <li>Colors: green, yellow, red</li>
                    <li>Numbers: 1, 2, 4</li>
                </ul>

                <CardGrid rows={[
                    [
                        [1, 'spring', 'moon'],
                        [2, 'spring', 'moon'],
                        [4, 'spring', 'moon'],
                    ],
                    [
                        [1, 'summer', 'moon'],
                        [2, 'summer', 'moon'],
                        [4, 'summer', 'moon'],
                    ],
                    [
                        [1, 'autumn', 'moon'],
                        [2, 'autumn', 'moon'],
                        [4, 'autumn', 'moon'],
                    ],
                ]}/>

                <p>
                    You may notice that each of these tensors is arrayed in a grid, with the vertical direction
                    representing variance in one dimension (shape, color, number), and the horizontal direction
                    variance in the other. In the 3 × 3 tensor above, for instance, color varies in the vertical
                    direction and number varies in the horizontal direction. It has only been possible to lay
                    out tensors into two-dimensional grids like this because all of them have had at least one list
                    which
                    is only one item long. For instance, in the above 3 × 3 tensor, there is only one shape.
                </p>

                <p>
                    It is certainly permissible to construct a tensor with more than one item in each list of traits,
                    though it is quite rare to do successfully during actual gameplay. For example:
                </p>

                <ul>
                    <li>Shapes: sun, moon</li>
                    <li>Colors: green, blue</li>
                    <li>Numbers: 1, 5</li>
                </ul>

                <CardGrid rows={[
                    [
                        [1, 'spring', 'sun'],
                        [1, 'winter', 'sun'],
                        [5, 'spring', 'sun'],
                        [5, 'winter', 'sun'],
                    ],
                    [
                        [1, 'spring', 'moon'],
                        [1, 'winter', 'moon'],
                        [5, 'spring', 'moon'],
                        [5, 'winter', 'moon'],
                    ],
                ]}/>

                <p>
                    In such cases, you can arrange your tensor as above, with two grids side-by-side. Some players
                    may prefer to stack their grids vertically, using the third physical dimension to represent the
                    third dimension of their cards. There is no gameplay significance to the physical arrangement of
                    cards in your tensor, so arrange them in whatever way you and other players find easiest to visually
                    understand.
                </p>

                <h3>Goal</h3>

                <p>
                    Briefly put, the goal of the game is to end the game with the single tensor with the largest number
                    of cards. If, at the end of the game, two or more players own tensors which are tied for being the
                    largest tensors on the table, the tie is broken by looking at their next-largest tensor. If this is
                    also the same size, the third-largest is compared, and so on.
                </p>

                <h3>Setup</h3>

                <p>
                    The setup for the game is very straightforward and typical. The deck is shuffled and a number of
                    cards are dealt face-down to each player, with the remaining cards placed as a deck in the center of
                    the table.
                </p>

                <ul>
                    <li>2 players: 8 cards</li>
                    <li>3 players: 6 cards</li>
                    <li>4 players: 5 cards</li>
                    <li>5 players: 4 cards</li>
                    <li>6 players: 3 cards</li>
                </ul>

                <p>
                    Each player should have a substantial amount of space in front of them for laying out cards. It may
                    be helpful to draw lines, lay down thread, use placemats, or find some other way to demarcate the
                    players' play areas from each other.
                </p>

                <h3>Order of play</h3>

                <p>
                    Choose a player to go first using any method you wish; players take turns in a consistent clockwise
                    direction around the table.
                </p>

                <p>
                    On a player's turn, the following two actions take place, in this order: placing a card, and taking
                    a card.
                </p>

                <h3>Placing cards</h3>

                <p>
                    Firstly, they <b>must</b> place a card from their hand face-up onto the play area in front of them.
                    They may either place the card on its own, starting a new group, or join the card to an existing
                    group. When adding a card to an existing group, indicate that it is part of the same group by laying
                    the cards so that they are physically touching. There is no limit to the number of new groups you
                    can create - you can have every card in your play area be on its own if you wish.
                </p>

                <p>
                    The groups you create by placing cards down are your in-progress tensors, but they need not be valid
                    tensors. Groups in a player's play area which are not currently valid tensors, because they lack
                    one or more of the cards needed to be a tensor, may be called <b>incomplete tensors</b>. For
                    instance, here is an incomplete tensor:
                </p>

                <CardGrid rows={[
                    [
                        null,
                        [1, 'winter', 'sun'],
                    ],
                    [
                        [1, 'spring', 'moon'],
                        [1, 'winter', 'moon'],
                    ],
                ]}/>

                <p>
                    On a later turn, you'd hope to complete the tensor by placing the missing card:
                </p>

                <CardGrid rows={[
                    [
                        [1, 'spring', 'sun'],
                        "right_arrow",
                        null,
                        [1, 'winter', 'sun'],
                    ],
                    [
                        null,
                        null,
                        [1, 'spring', 'moon'],
                        [1, 'winter', 'moon'],
                    ],
                ]}/>

                <p>
                    However - although you need not complete a tensor every time you place a card, you cannot add
                    completely unrelated cards to the same group. In order to add a card to a group, there must be at
                    least one card in that group which differs from the card you are adding in only one way.
                </p>

                <p>
                    For instance, this is a valid card placement, which results in the incomplete tensor from before,
                    because the one green moon only differs in color from the one blue moon:
                </p>

                <CardGrid rows={[
                    [
                        null,
                        null,
                        null,
                        [1, 'winter', 'sun'],
                    ],
                    [
                        [1, 'spring', 'moon'],
                        "right_arrow",
                        null,
                        [1, 'winter', 'moon'],
                    ],
                ]}/>

                <p>
                    You could even continue to grow the group in this way, since the one green star only differs from
                    the one green moon in shape:
                </p>

                <CardGrid rows={[
                    [
                        null,
                        null,
                        null,
                        [1, 'winter', 'sun'],
                    ],
                    [
                        null,
                        null,
                        [1, 'spring', 'moon'],
                        [1, 'winter', 'moon'],
                    ],
                    [
                        [1, 'spring', 'star'],
                        "right_arrow",
                        null,
                        null,
                    ],
                ]}/>

                <p>
                    However, this would be an illegal placement, as there is no card in the group similar
                    enough to the one yellow star:
                </p>

                <CardGrid rows={[
                    [
                        null,
                        null,
                        null,
                        [1, 'winter', 'sun'],
                    ],
                    [
                        null,
                        null,
                        [1, 'spring', 'moon'],
                        [1, 'winter', 'moon'],
                    ],
                    [
                        [1, 'summer', 'star'],
                        "right_arrow",
                        null,
                        null,
                    ],
                ]}/>

                <h3>Taking a card: draw or steal?</h3>

                <p>
                    After placing a card, a player takes one card to finish their turn, restoring the size of their hand
                    to the same number of cards they started with.
                </p>

                <p>
                    The simplest, and most common, way of doing this is by taking a card from the top of the deck in the
                    center of the table.
                </p>

                <p>
                    However, the player can instead choose to <b>steal</b> a card from another player.
                    The stealing player incorporates the stolen card into their
                    hand just like a normally drawn card; they cannot place the stolen card in the same turn.
                </p>

                <p>
                    Not just any card may be stolen, though. A card maybe be stolen under two circumstances:
                </p>

                <ul>
                    <li>The card is alone, not in a complete or incomplete tensor with other cards, or</li>
                    <li>
                        The card is part of an incomplete tensor, <i>and</i> the removal of the card does not
                        divide the incomplete tensor into two disjoint pieces.
                    </li>
                </ul>

                <p>
                    Let's look at some examples of that second case...
                </p>

                <p>
                    This tensor is just not eligible to be stolen from, since it is complete:
                </p>

                <CardGrid rows={[
                    [
                        [1, 'summer', 'sun'],
                        [5, 'summer', 'sun'],
                    ],
                ]}/>

                <p>
                    But supposing it had another card added to it, like below. Now either of the edge cards
                    can be stolen:
                </p>

                <CardGrid rows={[
                    [
                        "left_arrow",
                        [1, 'summer', 'sun'],
                        [5, 'summer', 'sun'],
                        null,
                    ],
                    [
                        null,
                        null,
                        [5, 'winter', 'sun'],
                        "right_arrow",
                    ],
                ]}/>

                <p>
                    Note that doing so results in this case in a complete tensor, from which more cards cannot be
                    stolen. For instance, if the five blue suns card is stolen from this tensor, then the remaining
                    two form the complete two-card tensor above.
                </p>

                <p>
                    However, for this incomplete three-card tensor, the theft of the middle card (as shown below)
                    is invalid.
                </p>

                <CardGrid rows={[
                    [
                        null,
                        [1, 'summer', 'sun'],
                        [5, 'summer', 'sun'],
                        "right_arrow",
                    ],
                    [
                        null,
                        null,
                        [5, 'winter', 'sun'],
                        null,
                    ],
                ]}/>

                <p>
                    This is because doing so splits the incomplete tensor into two separate pieces:
                </p>

                <CardGrid rows={[
                    [
                        null,
                        [1, 'summer', 'sun'],
                        null,
                        null,
                    ],
                    [
                        null,
                        null,
                        [5, 'winter', 'sun'],
                        null,
                    ],
                ]}/>

                <p>
                    Here's one more example. For this incomplete tensor, any of the cards may be stolen, as none of
                    them is the only link between the rest of the cards in the tensor!
                </p>

                <CardGrid rows={[
                    [
                        null,
                        [3, 'summer', 'moon'],
                        [3, 'autumn', 'moon'],
                    ],
                    [
                        [3, 'spring', 'star'],
                        [3, 'summer', 'star'],
                        [3, 'autumn', 'star'],
                    ],
                ]}/>

                <p>
                    Of course, if multiple cards were stolen from it, it would eventually become a complete two-
                    or three-card tensor immune to further stealing.
                </p>

                <h3>Stealing and extra turns</h3>

                <p>
                    Just as a player should always end their turn with the same number of cards in their hand, players
                    should always have the correct number of cards in their play area before passing play onto the next
                    person. By the time the game ends with the deck in the middle running out, all players should have
                    an equal number of cards in their possession.
                </p>

                <p>
                    To this end, if a player is stolen from, then the next time it becomes their turn, they get to
                    play an extra turn before passing play on to the next player.
                    If they are stolen from multiple times, they get multiple extra turns, i.e.,
                    the number of turns a player takes is equal to one (their normal turn) <b>plus</b> the number
                    of times they have been stolen from since their prior turn. You may wish to give players some kind
                    of token every time they are stolen from to remember how many extra turns they should take the next
                    time they go, to be removed once they finish taking all their turns.
                </p>

                <p>
                    When a player plays multiple consecutive turns, each turn follows the normal order of actions:
                    place a card, then take a card. That is, they should not place multiple cards without taking new
                    cards in between (not least because doing so serves no strategic interest for them), and they cannot
                    take a new card until after placing a card first.
                </p>

                <p>
                    Playing more than one turn in a row grants a unique opportunity to establish a new group without
                    risking its first card being stolen. You can use two back-to-back turns to place the first two cards
                    of a group, thereby protecting them both from theft.
                </p>

                <h3>Merging tensors</h3>

                <p>
                    At (nearly) any moment of the game, including during another player's turn, a player may choose
                    to merge two tensors which are already in the play area, satisfying two important criteria:
                </p>

                <ul>
                    <li>
                        Both tensors are complete before the merge (keeping in mind that a single card is always
                        a complete tensor)
                    </li>
                    <li>The tensor resulting from the merge is complete</li>
                </ul>

                <p>
                    That is, the following merge is legal:
                </p>

                <CardGrid rows={[
                    [
                        [3, 'autumn', 'star'],
                        "right_arrow",
                        null,
                        [4, 'autumn', 'star'],
                    ],
                ]}/>

                <p>
                    As is this:
                </p>

                <CardGrid rows={[
                    [
                        [1, 'spring', 'sun'],
                        "right_arrow",
                        null,
                        [1, 'winter', 'sun'],
                    ],
                    [
                        [1, 'spring', 'moon'],
                        "right_arrow",
                        null,
                        [1, 'winter', 'moon'],
                    ],
                ]}/>

                <p>
                    While this merge is illegal, because the group on the right is not a complete tensor:
                </p>

                <CardGrid rows={[
                    [
                        [1, 'spring', 'sun'],
                        "right_arrow",
                        null,
                        [1, 'winter', 'sun'],
                    ],
                    [
                        null,
                        null,
                        [1, 'spring', 'moon'],
                        [1, 'winter', 'moon'],
                    ],
                ]}/>

                <p>
                    This looks the same as the legal placement shown earlier! But it was legal in that case because
                    the one green sun card was being placed from the hand. If the one green sun card is already in the
                    play area, this merge is illegal. In fact, by allowing the one green sun to end up in the play area
                    separately from the incomplete tensor on the right, this player has doomed that incomplete tensor
                    to remain incomplete for the rest of the game, as the only way to complete it would be via this
                    illegal merge.
                </p>

                <p>
                    The one situation in which a player cannot merge two tensors is in response to someone trying to
                    steal one of their cards - merges cannot be used to prevent theft.
                </p>

                <h3>Trading cards</h3>

                <p>
                    Players are free to solicit and engage in trades, provided that the number of cards given and
                    received are equal, so that no player gains or loses a net number of cards. Players may even
                    show one of their cards to prove possession of it, for the purpose of inviting a trade. The
                    only caveat is that all card reveals and the faces of traded cards must be made visible to all
                    players.
                </p>

                <h3>Endgame</h3>

                <p>
                    When a player would take a turn, if they already have the maximum number of cards in their possession
                    (their hand and play area combined), their turn is skipped. The maximum number of cards can be
                    calculated by dividing the total number of cards in the deck (60) by the number of players:
                </p>

                <ul>
                    <li>2 players: 30 cards</li>
                    <li>3 players: 20 cards</li>
                    <li>4 players: 15 cards</li>
                    <li>5 players: 12 cards</li>
                    <li>6 players: 10 cards</li>
                </ul>

                <p>
                    Due to this, and the fact that extra turns are taken throughout the game to equalize the number of
                    cards possessed by all players, players will only begin reaching the maximum number of cards once
                    there are very few cards left in the deck. In fact, once any player has reached the maximum number
                    of cards and the order of turns makes its way back to the first player, the only turns left to be
                    played are extra turns to make up for recent thefts. If players continue to steal at this point,
                    play keeps proceeding in the normal order clockwise around the table, with victims of theft getting
                    to take extra turns when play reaches them even if they had previously reached the maximum number of
                    cards, until someone decides to take the final card from the deck, at which point normal play is over.
                </p>

                <p>
                    At this point, play continues proceeding clockwise after the person who took the final card from
                    the deck, but instead of normal turns, players resolve their hands by placing cards from their
                    hand into the play area in any order they wish, according to normal placement rules. At this stage,
                    they may still merge tensors at any time they wish according to normal merge rules, but they do
                    not take new cards, and theft is no longer permitted.
                </p>

                <p>
                    Because there is no longer any interaction between players, players simply place every card in
                    their hand before turning play over to the next player. The purpose of doing the resolution
                    stage in turns at all is just to provide oversight from the other players as a player is resolving
                    their cards, to prevent mistakes or cheating.
                </p>

                <p>
                    Once every player has been given a chance to resolve their hand and every card is face-up in play
                    areas, scoring is performed as described in the <b>Goal</b> section.
                </p>
            </>
        );
    }
}
