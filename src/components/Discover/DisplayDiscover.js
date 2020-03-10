import React, { Component } from "react";

export default class DisplayDiscover extends Component {
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
                                        <span>{data.vote_average * 10}%</span>
                                        <div className="dataDiscover">
                                            <a href={`/${type}/${data.id}`}>
                                                <p>{title}</p>
                                            </a>
                                            <p className="releaseDate">{this.formatDate(releaseDate)}</p>
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