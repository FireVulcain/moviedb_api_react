import React, { Component } from "react";
import { Link } from "react-router-dom";

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
                    {Math.floor(datas.runtime / 60) + "h" + (datas.runtime % 60 < 10 ? (datas.runtime % 60) * 10 : datas.runtime % 60)}
                </p>
                <p>
                    <strong>Budget</strong>
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(datas.budget)}
                </p>
                <p>
                    <strong>Recette</strong>
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(datas.revenue)}
                </p>
                <section className="genres">
                    <h4>Genres</h4>
                    <ul>
                        {datas.genres.map((genre, key) => {
                            return (
                                <li key={key}>
                                    <Link to={"/genre/" + genre.id}>{genre.name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </section>
                <section className="keywords">
                    <h4>Mots-clés</h4>
                    {datas.keywords.keywords.length > 0 ? (
                        <ul>
                            {datas.keywords.keywords.map((kw, key) => {
                                return (
                                    <li key={key}>
                                        <Link to={"/keyword/" + kw.id}>{kw.name}</Link>
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
