import React, { Component } from "react";
import star from "./../../assets/star.svg";
import calendar from "./../../assets/calendar.svg";

export default class RecommendationTv extends Component {
    render() {
        const { recommendations } = this.props;
        return (
            <section id="recommendation">
                <h2>Recommendations</h2>
                <div className="recommendationWrapper">
                    {recommendations.results.slice(0, 8).map((data, key) => {
                        let imgReco = data.backdrop_path ? (
                            <img alt={data.title} src={`https://image.tmdb.org/t/p/w250_and_h141_face/${data.backdrop_path}`} />
                        ) : (
                            <div className="no_image_holder"></div>
                        );
                        return (
                            <div key={key}>
                                <a className="img_content" href={`/tv/${data.id}`}>
                                    {imgReco}
                                    <div className="meta">
                                        <img src={calendar} alt="calendar" />
                                        <span className="release_date">{data.first_air_date}</span>
                                    </div>
                                </a>
                                <div className="recommendationInfo">
                                    <a href={`/tv/${data.id}`}>
                                        <p className="recommendationName">{data.name}</p>
                                    </a>
                                    <span className="rating">
                                        {data.vote_average}
                                        <img src={star} alt="rating" />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    }
}
