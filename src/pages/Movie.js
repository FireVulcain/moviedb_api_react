import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";

/* img */
import play from "./../assets/play.svg";

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: {},
            loading: true
        };
    }
    componentDidMount = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/${this.props.match.params.imdbID}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&append_to_response=videos,credits,reviews,keywords`
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result) {
                    return this.setState({ datas: result, loading: false });
                }
            });
    };
    formatCrew = (array) => {
        let result = array.reduce((h, { job, id, name }) => {
            return Object.assign(h, { [name]: (h[name] || []).concat({ job, id, name }) });
        }, {});

        let finalArray = [];
        Object.entries(result).map((data) => {
            finalArray[data[0]] = [];
            return data[1].map((res) => {
                let avaibleJob = ["Director", "Story", "Screenplay"];
                if (avaibleJob.includes(res.job)) {
                    finalArray[res.name].push([res.job]);
                    finalArray[res.name].id = res.id;
                }
                return finalArray;
            });
        });
        for (var propName in finalArray) {
            if (finalArray[propName].length === 0) {
                delete finalArray[propName];
            }
        }
        return finalArray;
    };
    render() {
        const { datas, loading } = this.state;
        return (
            <div className="displayMovie">
                {loading ? (
                    <SolarSystemLoading />
                ) : (
                    <div className="container">
                        {datas.poster_path ? (
                            <img className="poster" src={"https://image.tmdb.org/t/p/w300/" + datas.poster_path} alt={datas.title} />
                        ) : (
                            <div className="no_image_holder"></div>
                        )}
                        <div className="wrapperInfoMovie">
                            <h1>{datas.title}</h1>
                            <div className="moreInfos">
                                <div className="rating">{datas.vote_average * 10} %</div>
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

                            <h2>Synopsis</h2>
                            <p className="synopsis">{datas.overview}</p>
                            {datas.credits && datas.credits.cast.length > 0 ? (
                                <div>
                                    <h2>Featured Crew</h2>
                                    <ul className="listCrew">
                                        {Object.entries(this.formatCrew(datas.credits.crew)).map((data, key) => {
                                            return (
                                                <li key={key}>
                                                    <p className="crewName">
                                                        <a href={"/person/" + data[1].id}>{data[0]}</a>
                                                    </p>
                                                    <p className="crewJob">{data[1].toString()}</p>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    <h2>Top Billed Cast</h2>
                                    <div className="listActors">
                                        {datas.credits.cast.map((actors, key) => {
                                            if (key < 5) {
                                                return (
                                                    <div key={key}>
                                                        {actors.profile_path ? (
                                                            <img
                                                                className="castImg"
                                                                src={"https://image.tmdb.org/t/p/w185/" + actors.profile_path}
                                                                alt={actors.name}
                                                            />
                                                        ) : (
                                                            <div className="no_image_holder"></div>
                                                        )}

                                                        <p className="actorName">{actors.name}</p>
                                                    </div>
                                                );
                                            }
                                            return false;
                                        })}
                                    </div>
                                    {datas.reviews.results.length > 0 ? (
                                        <section id="review">
                                            <h2>Last Review</h2>
                                            <p className="reviewName">{datas.reviews.results[0].author}</p>
                                            <p className="reviewContent">{datas.reviews.results[0].content}</p>
                                            <a href={this.props.location.pathname + "/review"}>Read all reviews</a>
                                        </section>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>
                        <div className="additionalInfo">
                            <p>
                                <strong>Status</strong>
                                {datas.status}
                            </p>
                            <p>
                                <strong>Runtime</strong>
                                {Math.floor(datas.runtime / 60) + "h" + (datas.runtime % 60 < 10 ? (datas.runtime % 60) * 10 : datas.runtime % 60)}
                            </p>
                            <p>
                                <strong>Budget</strong>
                                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(datas.budget)}
                            </p>
                            <p>
                                <strong>Recette</strong>
                                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(datas.revenue)}
                            </p>
                            <section className="genres">
                                <h4>Genres</h4>
                                <ul>
                                    {datas.genres.map((genre, key) => {
                                        return <li key={key}>{genre.name}</li>;
                                    })}
                                </ul>
                            </section>
                            <section className="keywords">
                                <h4>Mots-clés</h4>
                                <ul>
                                    {datas.keywords.keywords.map((genre, key) => {
                                        return <li key={key}>{genre.name}</li>;
                                    })}
                                </ul>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
export default Movie;
