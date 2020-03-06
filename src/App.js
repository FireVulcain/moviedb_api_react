import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

/* Components */
import Navbar from "./components/Navbar";

/* Page */
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Search from "./pages/Search";

const customHistory = createBrowserHistory();

function App() {
    return (
        <Router history={customHistory}>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/discover"></Route>
                <Route exact path="/films"></Route>
                <Route exact path="/television"></Route>
                <Route exact path="/person"></Route>
                <Route exact path="/person/:idPerson"></Route>
                <Route exact path="/search" component={Search}></Route>
                <Route exact path="/movie/:imdbID" component={Movie}></Route>
            </Switch>
        </Router>
    );
}

export default App;
