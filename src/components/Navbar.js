import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Backwards from "./../assets/return_home.svg";
import Search from "./../assets/search.svg";

export default class Navbar extends Component {
    render() {
        return (
            <nav>
                <div className="returnHome">
                    <NavLink to="/">
                        <img src={Backwards} className="arrowLeft" alt="Backward arrow" />
                    </NavLink>
                    <p className="returnHomeTitle">Home</p>
                </div>
                <div className="nav_link">
                    <NavLink to="/discover">Discover</NavLink>
                    <NavLink to="/movie">Movies</NavLink>
                    <NavLink to="/tv">Television</NavLink>
                    <NavLink to="/person">People</NavLink>
                    <NavLink to="/trending">Trending</NavLink>
                    <NavLink to="/search" className="navSearch">
                        {<img src={Search} alt="Search img" />}
                    </NavLink>
                </div>
            </nav>
        );
    }
}
