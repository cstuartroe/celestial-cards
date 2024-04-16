import React, {Component} from "react";
import {Link} from "react-router-dom";

const workshopPageID = 3224326549;

type Props = {
    expandGames: () => void,
}

type State = {}

export default class Home extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <>
                <p>
                    Celestial cards are a variety of playing cards, with which many games can be played
                    and innumerable games may be invented. For a basic description of the cards, see{' '}
                    <Link to="/overview">Overview</Link>. For descriptions of some of the games you can play
                    with them, see the{' '}
                    <span className="link" onClick={() => this.props.expandGames()}>
                        games menu
                    </span>.
                </p>

                <h3>How do I get my hands on some??</h3>

                <p>
                    Two question marks - aren't you eager? The easiest way is to get your virtual hands on them over on{' '}
                    <a href="https://store.steampowered.com/app/286160/Tabletop_Simulator/" target="_blank">
                        Tabletop Simulator
                    </a>.
                    You can find them in the{' '}
                    <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3224326549" target="_blank">
                        Tabletop Simulator workshop
                    </a>{' '}
                    on Steam, or simply search for "Celestial cards" in the Games {">"} Workshop menu in Tabletop
                    Simulator.
                </p>

                <p>
                    If you'd like a physical copy, contact me at{' '}
                    <a href="mailto:conorstuartroe@gmail.com">
                        conorstuartroe@gmail.com
                    </a>.
                    I get celestial cards printed on proper, board game-quality glossy stock with rounded edges and
                    their own box! You can inquire about getting one as a gift or buying it from me at cost, or
                    simply advice on how to order your own from a custom printer.
                </p>
            </>
        );
    }
}
