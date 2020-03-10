import React, { Component } from "react";

class Results extends Component {
    render() {
        const { datas, error } = this.props;
        return (
            <div>
                {datas.length > 0 ? (
                    <div>
                        <div className="listData">
                            {datas
                                .sort((a, b) => (a.popularity > b.popularity ? -1 : 1))
                                .map((data, key) => {
                                    return (
                                        <div key={key}>
                                            <a href={`/${data.media_type}/${data.id}`}>
                                                {data.poster_path ? (
                                                    <img src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`} alt={data.title} />
                                                ) : data.profile_path ? (
                                                    <img src={`https://image.tmdb.org/t/p/w300/${data.profile_path}`} alt={data.name} />
                                                ) : (
                                                    <div className="no_image_holder"></div>
                                                )}

                                                <p>{data.title ? data.title : data.name}</p>
                                            </a>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                ) : (
                    <div>{error}</div>
                )}
            </div>
        );
    }
}
export default Results;
