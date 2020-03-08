import React, { Component } from "react";

export default class UpComing extends Component {
    dateDiffInDays = (a, b) => {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    };
    render() {
        const { upComing } = this.props;

        return (
            <div className="upComing">
                <h2>Upcoming</h2>
                <div className="upComingContainer">
                    {upComing.length > 0
                        ? upComing
                              .sort((a, b) => b.popularity - a.popularity)
                              .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
                              .filter((item) => this.dateDiffInDays(new Date(), new Date(item.release_date)) >= 0)
                              .slice(0, 8)
                              .map((datas, key) => {
                                  let imgToDisplay =
                                      datas.poster_path != null ? (
                                          <img
                                              src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2/${datas.poster_path}`}
                                              data-name={datas.title}
                                              alt={datas.title}
                                          />
                                      ) : (
                                          <div className="no_image_holder" data-name={datas.title}></div>
                                      );
                                  return (
                                      <div key={key}>
                                          <a href={`/movie/${datas.id}`}>
                                              {imgToDisplay}
                                              <p>{datas.title}</p>
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
