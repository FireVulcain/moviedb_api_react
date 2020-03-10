import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";
import ReactPaginate from "react-paginate";
import DisplayDiscover from "../components/Discover/DisplayDiscover";
import Select from "react-select";

class Discover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.match.params.type ? this.props.match.params.type : "movie",
            datas: [],
            error: "",
            loading: true,
            total_pages: 0,
            genres: [],
            selectYear: "",
            selectSortBy: "popularity.desc",
            selectByGenre: ""
        };
    }
    componentDidMount = () => {
        let avaibleTypes = ["movie", "tv", undefined];
        if (!avaibleTypes.includes(this.state.type)) return this.props.history.push(`/`);
        this.handlePage({ selected: this.props.match.params.page ? parseInt(this.props.match.params.page - 1) : 0 });
        this.getGenres(this.state.type);
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value }, () => {
            this.handlePage({ selected: 0 });
        });
    };
    handleMultipleValue = (event, select) => {
        let values;
        if (event) {
            values = event.map((item) => item.value);
            values = values.join(",");
        } else {
            values = "";
        }
        this.setState({ [select.name]: values }, () => {
            this.handlePage({ selected: 0 });
        });
    };
    handlePage = (pageNumber) => {
        let page = pageNumber.selected + 1;
        const { selectYear, selectSortBy, selectByGenre } = this.state;

        if (page > 500) return (window.location.href = `/discover/${this.props.match.params.type}/1`);

        this.props.history.push(`/discover/${this.state.type}/${page}`);

        fetch(
            `https://api.themoviedb.org/3/discover/${this.state.type}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&primary_release_year=${selectYear}&sort_by=${selectSortBy}&with_genres=${selectByGenre}&page=${page}`
        )
            .then((res) => res.json())
            .then((results) => {
                if (results.results.length > 0) {
                    return this.setState({ datas: results.results, total_pages: results.total_pages, loading: false }, () => {
                        window.scrollTo(0, 0);
                    });
                } else {
                    return this.setState({ error: "No results found." });
                }
            });
    };
    generateYears = () => {
        const currentYear = new Date().getFullYear();
        let years = Array.from({ length: currentYear - 1899 }, (value, index) => currentYear - index);
        return years.map((year, key) => {
            return (
                <option key={key} value={year}>
                    {year}
                </option>
            );
        });
    };
    getGenres = (type) => {
        return fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
            .then((res) => res.json())
            .then((results) => {
                results.genres.map((genre) => {
                    if ("name" !== "label") {
                        Object.defineProperty(genre, "label", Object.getOwnPropertyDescriptor(genre, "name"));
                        delete genre["name"];
                    }
                    if ("id" !== "value") {
                        Object.defineProperty(genre, "value", Object.getOwnPropertyDescriptor(genre, "id"));
                        delete genre["id"];
                    }
                    return false;
                });

                return this.setState({ genres: results.genres });
            });
    };
    render() {
        const { loading, datas, total_pages, type, genres, error } = this.state;
        let pageUrl = parseInt(this.props.match.params.page);
        return (
            <div className="dicoverContainer">
                {loading ? (
                    <SolarSystemLoading />
                ) : (
                    <div className="displayDiscover">
                        <div className="selectType">
                            <a href="/discover/movie/1" className={this.props.match.params.type === "movie" ? "active" : null}>
                                Movies
                            </a>
                            <a href="/discover/tv/1" className={this.props.match.params.type === "tv" ? "active" : null}>
                                Tv Shows
                            </a>
                        </div>
                        <form>
                            <select name="selectYear" id="selectYear" onChange={this.handleChange}>
                                <option value="">None</option>
                                {this.generateYears()}
                            </select>
                            <select name="selectSortBy" id="selectSortBy" onChange={this.handleChange}>
                                <option value="popularity.desc">Popularity Descending</option>
                                <option value="popularity.asc">Popularity Ascending</option>
                                <option value="release_date.desc">Release Date Descending</option>
                                <option value="release_date.asc">Release Date Ascending</option>
                                <option value="vote_average.asc">Rating Ascending</option>
                                <option value="vote_average.desc">Rating Descending</option>
                                <option value="original_title.asc">Title (A-Z)</option>
                                <option value="original_title.desc">Title (Z-A)</option>
                            </select>

                            <Select
                                isMulti
                                name="selectByGenre"
                                options={genres}
                                onChange={this.handleMultipleValue}
                                className="selectByGenre"
                                classNamePrefix="react-select"
                            />
                        </form>
                        <DisplayDiscover datas={datas} type={type} error={error} />
                        {datas.length > 0 ? (
                            <ReactPaginate
                                onPageChange={this.handlePage}
                                pageCount={total_pages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                containerClassName={"pagination"}
                                hrefBuilder={(page) => `/discover/${type}/${page}`}
                                forcePage={pageUrl ? pageUrl - 1 : 0}
                            />
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
}
export default Discover;
