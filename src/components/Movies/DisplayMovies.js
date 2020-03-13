import React, { Component } from "react";

/* Animated progress bar */
import { easeQuadInOut } from "d3-ease";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import AnimatedProgressProvider from "./../../utils/AnimatedProgressProvider";
import "react-circular-progressbar/dist/styles.css";
export default class DisplayMovies extends Component {
    formatDate = (date) => {
        date = new Date(date);
        let month = [];
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };
    render() {
        const { datas } = this.props;
        return (
            <div>
                {datas.length > 0 ? (
                    <div className="listMovies">
                        {datas.map((data, key) => {
                            return (
                                <div key={key}>
                                    <a href={`/movie/${data.id}`}>
                                        {data.backdrop_path ? (
                                            <img src={`https://image.tmdb.org/t/p/w500_and_h282_face${data.backdrop_path}`} alt={data.title} />
                                        ) : (
                                            <div className="no_image_holder"></div>
                                        )}
                                    </a>
                                    <div className="container">
                                        <AnimatedProgressProvider
                                            valueStart={0}
                                            valueEnd={data.vote_average * 10}
                                            duration={1.4}
                                            easingFunction={easeQuadInOut}
                                        >
                                            {(value) => {
                                                const displayRating =
                                                    value > 0 ? (
                                                        <span>
                                                            {Math.round(value)} <sup>%</sup>
                                                        </span>
                                                    ) : (
                                                        "NR"
                                                    );
                                                return (
                                                    <CircularProgressbarWithChildren
                                                        className="rating"
                                                        value={value}
                                                        styles={buildStyles({ pathTransition: "none", trailColor: "#54689c", pathColor: "#23345f" })}
                                                    >
                                                        <p className="ratingText">{displayRating}</p>
                                                    </CircularProgressbarWithChildren>
                                                );
                                            }}
                                        </AnimatedProgressProvider>
                                        <div className="dataMovie">
                                            <a href={`/movie/${data.id}`}>
                                                <p>{data.title}</p>
                                            </a>
                                            <p className="releaseDate">{this.formatDate(data.release_date)}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        );
    }
}
