import React, { Component } from "react";

export default class InTheaters extends Component {
    render() {
        const { inTheaters, nbElements } = this.props;
        return (
            <div className="inTheaters">
                <h2>In Theaters</h2>
                <div className="inTheatersContainer">
                    {inTheaters !== undefined
                        ? inTheaters.slice(0, nbElements).map((data, key) => {
                              let cls = key === 0 ? "highlightedMovie" : "listMovie";
                              let imgPath =
                                  key === 0 ? "https://image.tmdb.org/t/p/w500_and_h282_face" : "https://image.tmdb.org/t/p/w250_and_h141_face";
                              let imgPoster =
                                  key === 0 ? <img src={`https://image.tmdb.org/t/p/w58_and_h87_face/${data.poster_path}`} alt={data.title} /> : null;

                              return (
                                  <div key={key} className={cls}>
                                      <a href={`/movie/${data.id}`}>
                                          <img src={imgPath + data.backdrop_path} alt={data.title} />
                                          <div className="bannerTheather">
                                              {imgPoster}
                                              <div>
                                                  <h3 className="name">{data.title}</h3>
                                                  <div className="homeListCast">
                                                      {data.cast !== undefined
                                                          ? data.cast.map((cast, key, arr) => {
                                                                let space = arr.length - 1 === key ? "" : ",";
                                                                return (
                                                                    <span key={key}>
                                                                        {cast.name}
                                                                        {space}
                                                                    </span>
                                                                );
                                                            })
                                                          : null}
                                                  </div>
                                              </div>
                                          </div>
                                      </a>
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        );
    }
}
