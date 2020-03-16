import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default class MainInfos extends Component {
    groupByYear = (a, key) => {
        return a.reduce(function(r, o) {
            var m = null;
            if (o[key] !== undefined) {
                m = o[key].split("-")[0];
            } else {
                m = o[key];
            }
            r[m] ? r[m].data.push(o) : (r[m] = { data: [o] });
            return r;
        }, {});
    };
    clean = (a, key) => {
        a.map((b) => {
            if (b[key] === "") {
                return delete b[key];
            } else {
                return false;
            }
        });
        return a;
    };
    displayData = (id) => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
            .then((res) => res.json())
            .then((results) => {
                console.log(results);
            });
    };
    render() {
        const { datas } = this.props;
        let defaultIndex = datas.movie_credits.cast.length > 0 ? 0 : 1;
        let disabledMovie = datas.movie_credits.cast.length > 0 ? false : true;
        let disabledTv = datas.tv_credits.cast.length > 0 ? false : true;
        return (
            <div>
                <h1>{datas.name}</h1>
                <h2>Biography</h2>
                <p className="synopsis">{datas.biography}</p>
                <div>
                    <h2>Acting</h2>
                    <Tabs defaultIndex={defaultIndex}>
                        <TabList>
                            <Tab disabled={disabledMovie}>Movies</Tab>
                            <Tab disabled={disabledTv}>Tv Shows</Tab>
                        </TabList>

                        <TabPanel>
                            <ul className="listActorCasts">
                                {Object.entries(this.groupByYear(this.clean(datas.movie_credits.cast, "release_date"), "release_date")).map(
                                    (data, key) => {
                                        return (
                                            <div key={key}>
                                                {data[1].data.map((list, key) => {
                                                    let date =
                                                        "release_date" in list
                                                            ? list.release_date !== ""
                                                                ? new Date(list.release_date).getFullYear()
                                                                : "-"
                                                            : "-";
                                                    let character = list.character ? `as ${list.character}` : "";
                                                    return (
                                                        <li key={key}>
                                                            <span className="date">{date}</span> <a href={`/movie/${list.id}`}>{list.title}</a>{" "}
                                                            {character}
                                                        </li>
                                                    );
                                                })}
                                            </div>
                                        );
                                    }
                                )}
                            </ul>
                        </TabPanel>
                        <TabPanel>
                            <ul className="listActorCasts">
                                {Object.entries(this.groupByYear(this.clean(datas.tv_credits.cast, "first_air_date"), "first_air_date")).map(
                                    (data, key) => {
                                        return (
                                            <div key={key}>
                                                {data[1].data.map((list, key) => {
                                                    let date =
                                                        "first_air_date" in list
                                                            ? list.first_air_date !== ""
                                                                ? new Date(list.first_air_date).getFullYear()
                                                                : "-"
                                                            : "";
                                                    let character = list.character ? `as ${list.character}` : "";
                                                    return (
                                                        <li key={key}>
                                                            <span className="date">{date}</span>
                                                            <a href={`/tv/${list.id}`}>
                                                                {list.name} {`(${list.episode_count} episodes)`}
                                                            </a>{" "}
                                                            {character}
                                                        </li>
                                                    );
                                                })}
                                            </div>
                                        );
                                    }
                                )}
                            </ul>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}
