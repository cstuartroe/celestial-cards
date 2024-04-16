import React, {Component, useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import "../static/scss/main.scss";
import TopBar from "./TopBar";
import Home from "./Home";
import Overview from "./Overview";
import SetGame from "./games/SetGame";
import Poker from "./games/Poker";
import Tensor from "./games/Tensor";

type PageState = {
    expandGames: () => void,
}

function Page(props: {element: (p: PageState) => React.ReactNode }) {
    const [gamesExpanded, setGamesExpanded] = useState(false);
    const pageState: PageState = {
        expandGames: () => setGamesExpanded(true),
    }

    return <>
        <TopBar {...{gamesExpanded, setGamesExpanded}}/>
        <div className="container-fluid">
            <div className="row" style={{paddingTop: "18vh"}}/>
            <div className="row">
                <div className="col-12 col-md-6 offset-md-3">
                    {props.element(pageState)}
                </div>
            </div>
            <div className="row" style={{paddingTop: "20vh"}}/>
        </div>
    </>;
}

class App extends Component {
    render() {
        return (
            <RouterProvider router={createBrowserRouter([
                {
                    path: "/",
                    element: <Page element={ps => (
                        <Home expandGames={() => ps.expandGames()}/>
                    )}/>,
                },
                {
                    path: "/overview",
                    element: <Page element={ps => (
                        <Overview expandGames={() => ps.expandGames()}/>
                    )}/>,
                },
                {
                    path: "/games/set",
                    element: <Page element={ps => (
                        <SetGame/>
                    )}/>,
                },
                {
                    path: "/games/poker",
                    element: <Page element={ps => (
                        <Poker/>
                    )}/>,
                },
                {
                    path: "/games/tensor",
                    element: <Page element={ps => (
                        <Tensor/>
                    )}/>,
                },
            ])}/>
        );
    }
}

export default App;
