import React, { Component } from "react";
import { Link } from "react-router-dom";
import { formatCurrency, formatRuntime } from "./../../utils/helpers";

export default class MovieInfoSidebar extends Component {
    render() {
        const { datas } = this.props;
        return (
            <div>
                <h4>Informations</h4>
                <p>
                    <strong>Original Title</strong>
                    {datas.original_title}
                </p>
                <p>
                    <strong>Status</strong>
                    {datas.status}
                </p>
                <p>
                    <strong>Runtime</strong>
                    {formatRuntime(datas.runtime)}
                </p>
                <p>
                    <strong>Budget</strong>
                    {formatCurrency(datas.budget)}
                </p>
                <p>
                    <strong>Recette</strong>
                    {formatCurrency(datas.revenue)}
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
                    {datas.keywords.keywords.length > 0 ? (
                        <ul>
                            {datas.keywords.keywords.map((kw, key) => {
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
