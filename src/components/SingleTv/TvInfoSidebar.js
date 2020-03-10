import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TvInfoSidebar extends Component {
    render() {
        const { datas } = this.props;
        return (
            <div>
                <h4>Informations</h4>
                <p>
                    <strong>Original name</strong>
                    {datas.original_name}
                </p>
                <p>
                    <strong>Status</strong>
                    {datas.status}
                </p>

                <p>
                    <strong>Broadcaster</strong>
                    <Link to={`/network/${datas.networks[0].id}`}>
                        <img src={`https://image.tmdb.org/t/p/h30/${datas.networks[0].logo_path}`} alt={`${datas.networks[0].name}`} />
                    </Link>
                </p>
                <p>
                    <strong>Runtime</strong>
                    {datas.episode_run_time[0] + "m"}
                </p>
                <p>
                    <strong>Number of episodes</strong>
                    {datas.number_of_episodes}
                </p>
                <section className="genres">
                    <h4>Genres</h4>
                    {datas.genres.length > 0 ? (
                        <ul>
                            {datas.genres.map((genre, key) => {
                                return (
                                    <li key={key}>
                                        <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No genres have been added yet.</p>
                    )}
                </section>
                <section className="keywords">
                    <h4>Keywords</h4>
                    {datas.keywords.results.length > 0 ? (
                        <ul>
                            {datas.keywords.results.map((kw, key) => {
                                return (
                                    <li key={key}>
                                        <Link to={`/keyword/${kw.id}`}>{kw.name}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No keywords have been added yet.</p>
                    )}
                </section>
            </div>
        );
    }
}
