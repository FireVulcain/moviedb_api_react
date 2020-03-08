import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";
import OnTv from "../components/Home/OnTv";
import InTheaters from "../components/Home/InTheaters";
import UpComing from "../components/Home/UpComing";

const NUMBER_OF_ELEMENTS = 7;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onTv: {},
            inTheaters: {},
            loading: true,
            upComing: []
        };
    }
    componentDidMount = () => {
        //Fetch On airs on TV
        let onAirTv = fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    // console.log("On TV", result);
                    result.results.sort((a, b) => b.popularity - a.popularity);
                    return this.setState({ onTv: result }, () => {
                        for (let i = 0; i < NUMBER_OF_ELEMENTS; i++) {
                            this.getAirDate(result.results[i].id).then((res) => {
                                let newState = [...this.state.onTv.results];
                                newState.forEach((data) => {
                                    if (res.props["data-id"] === data.id) {
                                        data.nextEpisodeAirs = res;
                                    }
                                });
                                return this.setState({ [this.state.onTv.results]: newState });
                            });
                        }
                    });
                }
            });

        //Fetch Now playing in theaters
        let playingInTheaters = fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
            .then((res) => res.json())
            .then((result) => {
                // console.log("In Theaters", result);
                if (result) {
                    return this.setState({ inTheaters: result }, () => {
                        for (let i = 0; i < NUMBER_OF_ELEMENTS; i++) {
                            let nbCast = i === 0 ? 3 : 2;
                            this.getMovieCast(result.results[i].id, nbCast).then((res) => {
                                let newState = [...this.state.inTheaters.results];
                                res.map((cast, key) => {
                                    return newState.forEach((data) => {
                                        if (data.id === res[key].idFilm) {
                                            data.cast = res;
                                        }
                                    });
                                });
                                return this.setState({ [this.state.inTheaters.results]: newState });
                            });
                        }
                    });
                }
            });

        //Fetch Upcoming
        let upComing = fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
            .then((res) => res.json())
            .then((result) => {
                return new Promise((resolve) => {
                    for (let i = 1; i <= result.total_pages; i++) {
                        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&page=${i}`)
                            .then((res) => res.json())
                            .then((result) => {
                                return this.setState({ upComing: [...this.state.upComing, result.results].flat(Infinity) });
                            });
                    }
                    return resolve(result);
                });
            });

        Promise.all([onAirTv, playingInTheaters, upComing]).then(() => {
            return this.setState({ loading: false });
        });
    };

    getAirDate = (id) => {
        return fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
            .then((res) => res.json())
            .then((result) => {
                let nextEpisode = new Date(result.next_episode_to_air.air_date);
                let seasonNumber = result.next_episode_to_air.season_number;
                let episodeNumber = result.next_episode_to_air.episode_number;
                return [this.dateDiffInDays(new Date(), nextEpisode), seasonNumber, episodeNumber];
            })
            .then((res) => {
                switch (res[0]) {
                    case 0:
                        return (
                            <a data-id={id} href={`/tv/${id}/season/${res[1]}/episode/${res[2]}`}>
                                New episode airs today
                            </a>
                        );
                    case 1:
                        return (
                            <a data-id={id} href={`/tv/${id}/season/${res[1]}/episode/${res[2]}`}>
                                New episode airs tomorrow
                            </a>
                        );
                    default:
                        return (
                            <a data-id={id} href={`/tv/${id}/season/${res[1]}/episode/${res[2]}`}>
                                New episode airs in {res[0]} days
                            </a>
                        );
                }
            });
    };
    dateDiffInDays = (a, b) => {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    };
    getMovieCast = (id, nbCast) => {
        return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&append_to_response=credits`)
            .then((res) => res.json())
            .then((result) => {
                result.credits.cast.map((data) => {
                    data.idFilm = id;
                    return data;
                });
                return result.credits.cast.slice(0, nbCast);
            });
    };
    render() {
        const { onTv, inTheaters, loading, upComing } = this.state;
        return (
            <div>
                {loading ? (
                    <SolarSystemLoading />
                ) : (
                    <div id="homeContainer">
                        <div className="homeOnAir">
                            <OnTv onTv={onTv.results} nbElements={NUMBER_OF_ELEMENTS} />
                            <InTheaters inTheaters={inTheaters.results} nbElements={NUMBER_OF_ELEMENTS} />
                        </div>

                        <UpComing upComing={upComing} />
                    </div>
                )}
            </div>
        );
    }
}

export default Home;
