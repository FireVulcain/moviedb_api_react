import React, { Component } from "react";
import play from "./../../assets/play.svg";
import ModalVideo from "react-modal-video";

/* Animated progress bar */
import { easeQuadInOut } from "d3-ease";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import AnimatedProgressProvider from "./../../utils/AnimatedProgressProvider";
import "react-circular-progressbar/dist/styles.css";

export default class MainInfos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    openModal = () => {
        this.setState({ isOpen: true });
    };
    render() {
        const { datas } = this.props;
        return (
            <div>
                <h1>{datas.name}</h1>
                <div className="moreInfos">
                    <AnimatedProgressProvider valueStart={0} valueEnd={datas.vote_average * 10} duration={1.4} easingFunction={easeQuadInOut}>
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
                    {datas.videos && datas.videos.results.length > 0 ? (
                        <div className="video">
                            <ModalVideo
                                channel="youtube"
                                isOpen={this.state.isOpen}
                                videoId={datas.videos.results[0].key}
                                onClose={() => this.setState({ isOpen: false })}
                            />
                            <button className="trailer" onClick={this.openModal}>
                                <img src={play} alt="logoPlay" className="playTrailer" /> Play Opening Credits
                            </button>
                        </div>
                    ) : null}
                </div>

                <h2>Synopsis</h2>
                <p className="synopsis">{datas.overview}</p>
            </div>
        );
    }
}
