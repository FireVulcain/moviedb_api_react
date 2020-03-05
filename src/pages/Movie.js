import React, { Component } from "react";

/* img */
import play from "./../assets/play.svg";

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: {}
        };
    }
    componentDidMount = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/${this.props.match.params.imdbID}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=fr-US&append_to_response=videos,credits`
        )
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    return this.setState({ datas: result });
                }
            });
    };
    render() {
        const { datas } = this.state;
        console.log(datas);
        return (
            <div className="displayMovie">
                {datas.poster_path ? (
                    <img src={"https://image.tmdb.org/t/p/w300/" + datas.poster_path} alt={datas.title} />
                ) : (
                    <div className="no_image_holder"></div>
                )}

                <h1>{datas.title}</h1>
                <div className="moreInfos">
                    <div className="rating">
                        {datas.vote_average} <span>/10</span>
                    </div>
                    {datas.videos && datas.videos.results.length > 0 ? (
                        <div className="video">
                            <a
                                href={"https://www.youtube.com/watch?v=" + datas.videos.results[0].key}
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
                <p>{datas.overview}</p>

                {datas.credits && datas.credits.cast.length > 0 ? (
                    <div>
                        <h2>Tête d'affiche</h2>
                        <div className="listActors">
                            {datas.credits.cast.map((actors, key) => {
                                return (
                                    <div key={key}>
                                        {actors.profile_path ? (
                                            <img className="cast" src={"https://image.tmdb.org/t/p/w185/" + actors.profile_path} alt={actors.name} />
                                        ) : (
                                            <div className="no_image_holder"></div>
                                        )}

                                        <p>{actors.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
export default Movie;
