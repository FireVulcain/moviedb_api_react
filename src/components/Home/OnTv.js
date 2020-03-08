import React, { Component } from "react";

export default class OnTv extends Component {
    render() {
        const { onTv, nbElements } = this.props;
        return (
            <div className="onTv">
                <h2>On TV</h2>
                <div className="onTvContainer">
                    {onTv !== undefined
                        ? onTv.slice(0, nbElements).map((data, key) => {
                              let cls = key === 0 ? "highlightedSerie" : "listSerie";
                              let imgPath =
                                  key === 0 ? "https://image.tmdb.org/t/p/w500_and_h282_face" : "https://image.tmdb.org/t/p/w250_and_h141_face";
                              let imgPoster =
                                  key === 0 ? <img src={`https://image.tmdb.org/t/p/w58_and_h87_face/${data.poster_path}`} alt={data.name} /> : null;
                              return (
                                  <div key={key} className={cls}>
                                      <div>
                                          <a href={`/tv/${data.id}`}>
                                              <img src={imgPath + data.backdrop_path} alt={data.name} />
                                          </a>
                                          <div className="bannerTv">
                                              <a href={`/tv/${data.id}`}>{imgPoster}</a>
                                              <div>
                                                  <a href={`/tv/${data.id}`}>
                                                      <h3>{data.name}</h3>
                                                  </a>
                                                  <span>{data.nextEpisodeAirs}</span>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        );
    }
}
