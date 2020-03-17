import React, { Component } from "react";
import { groupByYear, clean } from "./../../utils/helpers";

export default class PersonTvCast extends Component {
    render() {
        const { datas } = this.props;
        return (
            <ul className="listActorCasts">
                {Object.entries(groupByYear(clean(datas, "first_air_date"), "first_air_date")).map((data, key) => {
                    return (
                        <div key={key}>
                            {data[1].data.map((list, key) => {
                                let date =
                                    "first_air_date" in list ? (list.first_air_date !== "" ? new Date(list.first_air_date).getFullYear() : "-") : "";
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
                })}
            </ul>
        );
    }
}
