import React, { Component } from "react";
import { formatDate } from "./../../utils/helpers";

/* Animated progress bar */
import { easeQuadInOut } from "d3-ease";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import AnimatedProgressProvider from "./../../utils/AnimatedProgressProvider";

export default class DisplayTrending extends Component {
    render() {
        const { datas, type, error } = this.props;
        return (
            <div>
                {datas.length > 0 ? (
                    <div className="listDiscover">
                        {datas.map((data, key) => {
                            let releaseDate = data.release_date ? data.release_date : data.first_air_date;
                            let title = data.title ? data.title : data.name;
                            return (
                                <div key={key}>
                                    <a href={`/${type}/${data.id}`}>
                                        {data.backdrop_path ? (
                                            <img src={`https://image.tmdb.org/t/p/w500_and_h282_face${data.backdrop_path}`} alt={title} />
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
                                                        styles={buildStyles({
                                                            pathTransition: "none",
                                                            trailColor: "#54689c",
                                                            pathColor: "#23345f"
                                                        })}
                                                    >
                                                        <p className="ratingText">{displayRating}</p>
                                                    </CircularProgressbarWithChildren>
                                                );
                                            }}
                                        </AnimatedProgressProvider>
                                        <div className="dataDiscover">
                                            <a href={`/${type}/${data.id}`}>
                                                <p>{title}</p>
                                            </a>
                                            <p className="releaseDate">{formatDate(releaseDate)}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>{error}</p>
                )}
            </div>
        );
    }
}
