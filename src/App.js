import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Components */
import Navbar from "./components/Navbar";

/* Page */
import Home from "./pages/Home";
import Movie from "./pages/Movie";

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/:imdbID" component={Movie}></Route>
            </Switch>
        </Router>
    );
}

export default App;
