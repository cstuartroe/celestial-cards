import React, {Component} from "react";
import {Navigate} from "react-router-dom";
import classNames from "classnames";

const games: [string, string][] = [
    ["/games/set", "Set"],
    ["/games/poker", "Poker"],
    ["/games/tensor", "Tensor"],
];

type Props = {
    gamesExpanded: boolean,
    setGamesExpanded: (b: boolean) => void,
}

type State = {
    destination?: string,
}

export default class TopBar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        const {destination} = this.state;

        if (destination !== undefined) {
            this.setState({destination: undefined});
            return <Navigate to={destination}/>;
        }

        return (
            <div className="container-fluid topbar">
                <div className="row">
                    <div className="col-12 d-md-none pointer menu-center"
                         onClick={() => this.setState({destination: "/"})}>
                        <h2>
                            Celestial Cards
                        </h2>
                    </div>
                    <div className="col-6 col-md-4 pointer menu-left"
                         onClick={() => this.setState({destination: "/overview"})}>
                        <h3>
                            Overview
                        </h3>
                    </div>
                    <div className="d-none d-md-block col-md-4 pointer menu-center"
                         onClick={() => this.setState({destination: "/"})}>
                        <h1>
                            Celestial Cards
                        </h1>
                    </div>
                    <div
                        className={classNames("col-6 col-md-4 menu-right", {"expanded": this.props.gamesExpanded})}
                        style={{position: "relative"}}
                        onMouseEnter={() => this.props.setGamesExpanded(true)}
                        onMouseLeave={() => this.props.setGamesExpanded(false)}
                    >
                        <h3>
                            Games
                        </h3>
                        {this.props.gamesExpanded && (
                            <div className="games-list">
                                {games.map(([url, name], i) => (
                                    <div
                                        className={classNames("pointer", {"game-link": i + 1 < games.length})}
                                        onClick={() => {
                                            this.setState({destination: url});
                                            this.props.setGamesExpanded(false);
                                        }}
                                        key={url}
                                    >
                                        <h3>
                                            {name}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
