import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

/* Components */
import Navbar from "./components/Navbar";

/* Page */
import Home from "./pages/Home";
import SingleMovie from "./pages/SingleMovie";
import Search from "./pages/Search";
import SingleTv from "./pages/SingleTv";
import Movies from "./pages/Movies";
import Tv from "./pages/Tv";
import Discover from "./pages/Discover";
import People from "./pages/People";
import MovieReviews from "./pages/MovieReviews";
import TvReviews from "./pages/TvReviews";
import Person from "./pages/Person";
import Trending from "./pages/Trending";

const customHistory = createBrowserHistory();

function App() {
    return (
        <Router history={customHistory}>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home}></Route>

                <Route exact path="/discover" component={Discover}></Route>
                <Route exact path="/discover/:type/" component={Discover}></Route>
                <Route exact path="/discover/:type/:page(\d+)" component={Discover}></Route>

                <Route exact path="/movies" component={Movies}></Route>
                <Route exact path="/movies/:type/:page(\d+)" component={Movies}></Route>
                <Route exact path="/movie/:imdbID(\d+)" component={SingleMovie}></Route>
                <Route exact path="/movie/:imdbID(\d+)/reviews" component={MovieReviews}></Route>

                <Route exact path="/tv" component={Tv}></Route>
                <Route exact path="/tv/:type/:page(\d+)" component={Tv}></Route>
                <Route exact path="/tv/:imdbID(\d+)" component={SingleTv}></Route>
                <Route exact path="/tv/:imdbID(\d+)/reviews" component={TvReviews}></Route>
                <Route exact path="/tv/:imdbID(\d+)/season/:nbSeason"></Route>
                <Route exact path="/tv/:imdbID(\d+)/season/:nbSeason/episode/nbEpisode"></Route>

                <Route exact path="/people" component={People}></Route>
                <Route exact path="/people/:page(\d+)" component={People}></Route>
                <Route exact path="/person/:idPerson(\d+)" component={Person}></Route>

                <Route exact path="/trending" component={Trending}></Route>
                <Route exact path="/trending/:type/:timezone/:page(\d+)" component={Trending}></Route>

                <Route exact path="/network/:idNetwork(\d+)"></Route>

                <Route exact path="/genre/:idGenre(\d+)"></Route>

                <Route exact path="/keyword/:idKeyword(\d+)"></Route>

                <Route exact path="/search" component={Search}></Route>
                <Route exact path="/search/:query" component={Search}></Route>
                <Route exact path="/search/:query/:page(\d+)" component={Search}></Route>

                <Route exact path="*" component={Home}></Route>
            </Switch>
        </Router>
    );
}

export default App;
