import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";

const NUMBER_OF_ELEMENTS = 3;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onTv: {},
            inTheaters: {},
            loading: true,
            nextEpisodeAirs: []
        };
    }
    componentDidMount = () => {
        fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
            .then((res) => res.json())
            .then((result) => {
                // console.log(result);
                if (result) {
                    return this.setState({ onTv: result });
                }
            })
            .then(() => {
                for (let i = 0; i < NUMBER_OF_ELEMENTS; i++) {
                    this.getAirDate(this.state.onTv.results[i].id).then((res) => {
                        return this.setState({ nextEpisodeAirs: [...this.state.nextEpisodeAirs, res] });
                    });
                }
            })
            .then(() => {
                fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
                    .then((res) => res.json())
                    .then((result) => {
                        // console.log(result);
                        if (result) {
                            return this.setState({ inTheaters: result, loading: false });
                        }
                    });
            });
    };

    getAirDate = (id) => {
        return fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
            .then((res) => res.json())
            .then((result) => {
                let nextEpisode = new Date(result.next_episode_to_air.air_date);
                return this.dateDiffInDays(new Date(), nextEpisode);
            })
            .then((res) => {
                switch (res) {
                    case 0:
                        return "Next episode airs today";
                    case 1:
                        return "Next episode airs tomorrow";
                    default:
                        return "Next episode airs in " + res + " days";
                }
            });
    };
    dateDiffInDays = (a, b) => {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    };
    render() {
        const { onTv, inTheaters, nextEpisodeAirs, loading } = this.state;

        return (
            <div>
                {loading ? (
                    <SolarSystemLoading />
                ) : (
                    <div id="homeContainer">
                        <div className="onTv">
                            <h2>On TV</h2>
                            <div className="onTvContainer">
                                {onTv.results.slice(0, NUMBER_OF_ELEMENTS).map((data, key) => {
                                    let cls = key === 0 ? "highlightedSerie" : "listSerie";
                                    let imgPath =
                                        key === 0 ? "https://image.tmdb.org/t/p/w500_and_h282_face" : "https://image.tmdb.org/t/p/w250_and_h141_face";
                                    return (
                                        <div key={key} className={cls}>
                                            <a href={"/tv/" + data.id}>
                                                <img src={imgPath + data.backdrop_path} alt="" />
                                                <h3 className="bannerTv">
                                                    {data.name} <span>{nextEpisodeAirs[key]}</span>
                                                </h3>
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="inTheaters">
                            <h2>In Theaters</h2>
                            <div className="inTheatersContainer">
                                {inTheaters.results.slice(0, NUMBER_OF_ELEMENTS).map((data, key) => {
                                    let cls = key === 0 ? "highlightedMovie" : "listMovie";
                                    let imgPath =
                                        key === 0 ? "https://image.tmdb.org/t/p/w500_and_h282_face" : "https://image.tmdb.org/t/p/w250_and_h141_face";
                                    return (
                                        <div key={key} className={cls}>
                                            <a href={"/movie/" + data.id}>
                                                <img src={imgPath + data.backdrop_path} alt="" />
                                                <h3 className="name">{data.title}</h3>
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Home;
