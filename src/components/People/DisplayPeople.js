import React, { Component } from "react";

export default class DisplayPeople extends Component {
    displayKnownFor = (list) => {
        const rowLen = list.length;
        return list.map((data, key) => {
            let separate = rowLen === key + 1 ? "" : ", ";
            let title = data.title ? data.title : data.name;
            return title + separate;
        });
    };
    render() {
        const { datas } = this.props;
        return (
            <div>
                <h2>Popular People</h2>
                {datas.length > 0 ? (
                    <div className="listPeople">
                        {datas.map((data, key) => {
                            return (
                                <div key={key}>
                                    <a href={`/person/${data.id}`}>
                                        {data.profile_path ? (
                                            <img src={`https://image.tmdb.org/t/p/w235_and_h235_face${data.profile_path}`} alt={data.name} />
                                        ) : (
                                            <div className="no_image_holder"></div>
                                        )}
                                    </a>
                                    <div className="container">
                                        <div className="dataPeople">
                                            <a href={`/person/${data.id}`}>
                                                <p className="name">{data.name}</p>
                                            </a>
                                            <span>{this.displayKnownFor(data.known_for)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        );
    }
}
