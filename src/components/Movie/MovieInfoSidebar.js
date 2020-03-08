import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MovieInfoSidebar extends Component {
    formatCurrency(currency) {
        let formattedValue = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(currency);
        if (formattedValue === "$0.00") {
            formattedValue = "-";
        }
        return formattedValue;
    }
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
                    {this.formatCurrency(datas.budget)}
                </p>
                <p>
                    <strong>Recette</strong>
                    {this.formatCurrency(datas.revenue)}
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
                        <p>No Genre have been added yet.</p>
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
