import React, { Component } from "react";

export default class UpComing extends Component {
    dateDiffInDays = (a, b) => {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    };
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
                                                  <span>{this.formatDate(datas.release_date)}</span>
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
