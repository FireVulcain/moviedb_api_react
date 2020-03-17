import React, { Component } from "react";
import { groupByYear, clean } from "./../../utils/helpers";

export default class PersonMoviesCast extends Component {
    render() {
        const { datas } = this.props;
        return (
            <ul className="listActorCasts">
                {Object.entries(groupByYear(clean(datas, "release_date"), "release_date")).map((data, key) => {
                    return (
                        <div key={key}>
                            {data[1].data.map((list, key) => {
                                let date =
                                    "release_date" in list ? (list.release_date !== "" ? new Date(list.release_date).getFullYear() : "-") : "-";
                                let character = list.character ? `as ${list.character}` : "";
                                return (
                                    <li key={key}>
                                        <span className="date">{date}</span> <a href={`/movie/${list.id}`}>{list.title}</a> {character}
                                    </li>
                                );
                            })}
                        </div>
                    );
                })}
            </ul>
        );
    }
}
