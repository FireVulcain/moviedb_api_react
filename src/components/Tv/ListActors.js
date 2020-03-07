import React, { Component } from "react";

export default class ListActors extends Component {
    render() {
        const { actors } = this.props;
        return (
            <div>
                <h2>Top Billed Cast</h2>
                <div className="listActors">
                    {actors.slice(0, 5).map((actors, key) => {
                        return (
                            <div key={key}>
                                {actors.profile_path ? (
                                    <img className="castImg" src={"https://image.tmdb.org/t/p/w185/" + actors.profile_path} alt={actors.name} />
                                ) : (
                                    <div className="no_image_holder"></div>
                                )}

                                <p className="actorName">{actors.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
