import React, { Component } from "react";
import { formatDate } from "./../../utils/helpers";

export default class UpComing extends Component {
    render() {
        const { upComing } = this.props;

        return (
            <div className="upComing">
                <h2>Upcoming Movies</h2>
                <div className="upComingContainer">
                    {upComing.length > 0
                        ? upComing.slice(0, 9).map((datas, key) => {
                              let cls = key === 0 ? "highlightedUpComing" : "listUpComing";
                              let imgToDisplay = datas.backdrop_path ? (
                                  key === 0 ? (
                                      <img src={"https://image.tmdb.org/t/p/w1280" + datas.backdrop_path} alt={datas.name} />
                                  ) : (
                                      <img src={"https://image.tmdb.org/t/p/w342" + datas.backdrop_path} alt={datas.name} />
                                  )
                              ) : (
                                  <div className="no_image_holder"></div>
                              );

                              let imgPoster =
                                  key === 0 ? (
                                      datas.backdrop_path ? (
                                          <img src={`https://image.tmdb.org/t/p/w58_and_h87_face/${datas.poster_path}`} alt={datas.name} />
                                      ) : null
                                  ) : null;
                              return (
                                  <div key={key} className={cls}>
                                      <div>
                                          <a href={`/movie/${datas.id}`}>{imgToDisplay}</a>
                                          <div className="bannerUpComing">
                                              <a href={`/movie/${datas.id}`}>{imgPoster}</a>
                                              <div>
                                                  <a href={`/movie/${datas.id}`}>
                                                      <h3>{datas.title}</h3>
                                                  </a>
                                                  <span>{formatDate(datas.release_date)}</span>
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
