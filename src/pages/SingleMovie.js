import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";

/* components */
import MovieInfoSidebar from "../components/SingleMovie/MovieInfoSidebar";
import RecommendationMovie from "../components/SingleMovie/RecommendationMovie";
import ReviewMovie from "../components/SingleMovie/ReviewMovie";
import ListActors from "../components/SingleMovie/ListActors";
import ListCrews from "../components/SingleMovie/ListCrews";
import MainInfos from "../components/SingleMovie/MainInfos";

class SingleMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: {},
            loading: true
        };
    }
    componentDidMount = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/${this.props.match.params.imdbID}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&append_to_response=videos,credits,reviews,keywords,recommendations`
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.status_code === 34) return this.props.history.push(`/`);
                if (result) {
                    return this.setState({ datas: result, loading: false });
                }
            });
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
                            <img className="poster" src={`https://image.tmdb.org/t/p/w300${datas.poster_path}`} alt={datas.title} />
                        ) : (
                            <div className="no_image_holder poster"></div>
                        )}
                        <div className="wrapperInfoMovie">
                            <MainInfos datas={datas} />
                            {datas.credits && datas.credits.cast.length > 0 ? (
                                <div>
                                    <ListCrews crew={datas.credits.crew} />
                                    <ListActors actors={datas.credits.cast} />
                                    {datas.reviews.results.length > 0 ? (
                                        <ReviewMovie reviews={datas.reviews} pathName={this.props.location.pathname} />
                                    ) : null}
                                    {datas.recommendations.results.length > 0 ? (
                                        <RecommendationMovie recommendations={datas.recommendations} />
                                    ) : null}
                                </div>
                            ) : null}
                        </div>
                        <div className="additionalInfo">
                            <MovieInfoSidebar datas={datas} />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
export default SingleMovie;
