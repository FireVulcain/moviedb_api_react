import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";
import ReactPaginate from "react-paginate";
import DisplayMovies from "../components/Movies/DisplayMovies";
class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "popular",
            datas: [],
            loading: true,
            total_pages: 0,
            error: ""
        };
    }
    componentDidMount = () => {
        fetch(`https://api.themoviedb.org/3/movie/${this.state.value}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&region=US`)
            .then((res) => res.json())
            .then((result) => {
                return this.setState({ datas: result.results, total_pages: result.total_pages, loading: false });
            });
    };
    handleChange = (event) => {
        this.setState({ value: event.target.value, loading: true }, () => {
            fetch(`https://api.themoviedb.org/3/movie/${this.state.value}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&region=US`)
                .then((res) => res.json())
                .then((result) => {
                    return this.setState({ datas: result.results, total_pages: result.total_pages, loading: false });
                });
        });
    };
    handleSubmit(event) {
        event.preventDefault();
    }

    handlePage = (pageNumber) => {
        let page = pageNumber.selected + 1;
        // this.props.history.push(`/movies/${this.state.value}/${page}`);
        fetch(`https://api.themoviedb.org/3/movie/${this.state.value}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&region=US&page=${page}`)
            .then((res) => {
                return res.json();
            })
            .then((results) => {
                if (results.total_results > 0) {
                    return this.setState({ datas: results.results, loading: false }, () => {
                        window.scrollTo(0, 0);
                    });
                } else {
                    return this.setState({ error: "Aucun résultat" });
                }
            });
    };
    render() {
        const { datas, total_pages, loading, error, value } = this.state;
        return (
            <div className="displayMovies">
                <form onSubmit={this.handleSubmit}>
                    <select name="selectCat" id="selectCat" value={this.state.value} onChange={this.handleChange}>
                        <option value="popular">Popular</option>
                        <option value="top_rated">Top Rated</option>
                        <option value="upcoming">Upcomming</option>
                        <option value="now_playing">Now Playing</option>
                    </select>
                </form>
                {loading ? (
                    <SolarSystemLoading />
                ) : (
                    <div>
                        <DisplayMovies datas={datas} error={error} />
                        {datas.length > 0 ? (
                            <ReactPaginate
                                onPageChange={this.handlePage}
                                pageCount={total_pages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                containerClassName={"pagination"}
                                hrefBuilder={(page) => `/movies/${value}/${page}`}
                            />
                        ) : // initialPage={this.props.match.params.page ? parseInt(this.props.match.params.page - 1) : 0}
                        null}
                    </div>
                )}
            </div>
        );
    }
}
export default Movies;
