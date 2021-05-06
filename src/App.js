import './style.css';
import React, {useState} from "react";
import SearchParams from './SearchParams';
import {Link, Router} from "@reach/router";
import Details from "./details";
import ThemeContext from "./ThemeContext";

const App = () => {
    const themeHook = useState('darkgreen');
    return (
        <ThemeContext.Provider value={themeHook}>
        <div>
            <header>
                <Link to={"/"}>
                    Adopt Me!
                </Link>
            </header>
            <Router>
                <SearchParams path={"/"}/>
                <Details path ="/details/:id" />
            </Router>
        </div>
        </ThemeContext.Provider>
    )
};

export default App;

