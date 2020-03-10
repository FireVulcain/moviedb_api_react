import React, { Component } from "react";
import play from "./../../assets/play.svg";

export default class MainInfos extends Component {
    render() {
        const { datas } = this.props;
        return (
            <div>
                <h1>{datas.name}</h1>
                <div className="moreInfos">
                    <div className="rating">{datas.vote_average * 10} %</div>
                    {datas.videos && datas.videos.results.length > 0 ? (
                        <div className="video">
                            <a
                                href={`https://www.youtube.com/watch?v=${datas.videos.results[0].key}`}
                                target="_blank"
                                className="trailer"
                                rel="noopener noreferrer"
                            >
                                <img src={play} alt="logoPlay" className="playTrailer" />
                                Voir la bande annonce
                            </a>
                        </div>
                    ) : null}
                </div>

                <h2>Synopsis</h2>
                <p className="synopsis">{datas.overview}</p>
            </div>
        );
    }
}
