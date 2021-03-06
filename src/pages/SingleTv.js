import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";

/* img */
import TvInfoSidebar from "../components/SingleTv/TvInfoSidebar";
import RecommendationTv from "../components/SingleTv/RecommendationTv";
import ReviewTv from "../components/SingleTv/ReviewTv";
import ListActors from "../components/SingleTv/ListActors";
import ListCrews from "../components/SingleTv/ListCrews";
import MainInfos from "../components/SingleTv/MainInfos";

class Tv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: {},
            loading: true
        };
    }
    componentDidMount = () => {
        fetch(
            `https://api.themoviedb.org/3/tv/${this.props.match.params.imdbID}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&append_to_response=videos,credits,reviews,keywords,recommendations`
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
                            {datas.credits ? (
                                <div>
                                    <ListCrews crew={datas.credits.crew} creator={datas.created_by} />
                                    {datas.credits.cast.length > 0 ? <ListActors actors={datas.credits.cast} /> : null}

                                    {datas.reviews.results.length > 0 ? (
                                        <ReviewTv reviews={datas.reviews} pathName={this.props.location.pathname} />
                                    ) : null}
                                    {datas.recommendations.results.length > 0 ? <RecommendationTv recommendations={datas.recommendations} /> : null}
                                </div>
                            ) : null}
                        </div>
                        <div className="additionalInfo">
                            <TvInfoSidebar datas={datas} />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
export default Tv;
