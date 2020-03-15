import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";

export default class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            datas: []
        };
    }
    textAbstract = (review, length) => {
        if (review.content.split(" ").length <= length) return <p className="reviewContent">{review.content}</p>;
        let url = review.url;
        review = review.content
            .split(" ")
            .splice(0, length)
            .join(" ");
        return (
            <div>
                <p className="reviewContent">
                    {review}...{" "}
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        Read the rest
                    </a>
                </p>
            </div>
        );
    };
    componentDidMount = () => {
        if (!this.props.match.params.imdbID) return this.props.history.push(`/`);
        const imdbID = this.props.match.params.imdbID;
        fetch(`https://api.themoviedb.org/3/movie/${imdbID}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&append_to_response=reviews`)
            .then((res) => res.json())
            .then((results) => {
                if (results.reviews.results.length > 0) {
                    return this.setState({ datas: results, loading: false });
                }
            });
    };
    render() {
        const { datas, loading } = this.state;

        return (
            <div>
                {loading ? (
                    <SolarSystemLoading />
                ) : (
                    <div className="reviewsContainer">
                        <div className="infoMovies">
                            <a href={`/movie/${datas.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w116_and_h174_face${datas.poster_path}`} alt="" />
                            </a>
                            <div>
                                <a href={`/movie/${datas.id}`}>
                                    <h2>
                                        {datas.title} <span>({new Date(datas.release_date).getFullYear()})</span>
                                    </h2>
                                </a>

                                <a href={`/movie/${datas.id}`}>← Back to main</a>
                            </div>
                        </div>
                        <div className="listReviews">
                            {datas.reviews.results.length > 0
                                ? datas.reviews.results.map((data, key) => {
                                      return (
                                          <div key={key}>
                                              <h3>A review by {data.author}</h3>
                                              {this.textAbstract(data, 100)}
                                          </div>
                                      );
                                  })
                                : null}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
