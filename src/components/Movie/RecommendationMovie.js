import React, { Component } from "react";
import star from "./../../assets/star.svg";
import calendar from "./../../assets/calendar.svg";

export default class RecommendationMovie extends Component {
    render() {
        const { recommendations } = this.props;
        return (
            <section id="recommendation">
                <h2>Recommendations</h2>
                <div className="recommendationWrapper">
                    {recommendations.results.map((data, key) => {
                        if (key < 8) {
                            return (
                                <div key={key}>
                                    <a className="img_content" href={"/movie/" + data.id}>
                                        <img alt={data.title} src={"https://image.tmdb.org/t/p/w250_and_h141_face/" + data.backdrop_path} />
                                        <div className="meta">
                                            <img src={calendar} alt="calendar" />
                                            <span className="release_date">{data.release_date}</span>
                                        </div>
                                    </a>
                                    <div className="recommendationInfo">
                                        <a href={"/movie/" + data.id}>
                                            <p className="recommendationName">{data.title}</p>
                                        </a>
                                        <span className="rating">
                                            {data.vote_average}
                                            <img src={star} alt="rating" />
                                        </span>
                                    </div>
                                </div>
                            );
                        }
                        return false;
                    })}
                </div>
            </section>
        );
    }
}
