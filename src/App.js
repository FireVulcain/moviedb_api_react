import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

/* Components */
import Navbar from "./components/Navbar";

/* Page */
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import Tv from "./pages/Tv";

const customHistory = createBrowserHistory();

function App() {
    return (
        <Router history={customHistory}>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/discover"></Route>
                <Route exact path="/movie"></Route>
                <Route exact path="/movie/:imdbID" component={Movie}></Route>
                <Route exact path="/movie/:imdbID/reviews"></Route>
                <Route exact path="/tv"></Route>
                <Route exact path="/tv/:imdbID" component={Tv}></Route>
                <Route exact path="/tv/:imdbID/season/:nbSeason" component={Tv}></Route>
                <Route exact path="/tv/:imdbID/season/:nbSeason/episode/nbEpisode" component={Tv}></Route>
                <Route exact path="/tv/:imdbID/reviews"></Route>
                <Route exact path="/person"></Route>
                <Route exact path="/person/:idPerson"></Route>
                <Route exact path="/trending"></Route>
                <Route exact path="/trending/:idTrending"></Route>
                <Route exact path="/network/:idNetwork"></Route>
                <Route exact path="/genre/:idGenre"></Route>
                <Route exact path="/keyword/:idKeyword"></Route>
                <Route exact path="/search" component={Search}></Route>
            </Switch>
        </Router>
    );
}

export default App;
