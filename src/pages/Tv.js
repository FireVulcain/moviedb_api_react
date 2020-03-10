import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";
import ReactPaginate from "react-paginate";
import DisplayTv from "../components/Tv/DisplayTv";

class Tv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.match.params.type ? this.props.match.params.type : "popular",
            datas: [],
            loading: true,
            total_pages: 0
        };
    }
    componentDidMount = () => {
        let avaibleTypes = ["popular", "on_the_air", "top_rated", "airing_today", undefined];
        if (!avaibleTypes.includes(this.props.match.params.type)) return this.props.history.push(`/`);
        this.handlePage({ selected: this.props.match.params.page ? parseInt(this.props.match.params.page - 1) : 0 });
    };
    handleChange = (event) => {
        this.setState({ type: event.target.value }, () => {
            this.props.history.push(`/tv/${this.state.type}/1`);
            this.handlePage({ selected: 0 });
        });
    };

    handlePage = (pageNumber) => {
        let page = pageNumber.selected + 1;

        if (page > 500) return this.props.history.push(`/tv/${this.props.match.params.type}/1`);

        this.props.history.push(`/tv/${this.state.type}/${page}`);

        fetch(`https://api.themoviedb.org/3/tv/${this.state.type}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&region=US&page=${page}`)
            .then((res) => res.json())
            .then((results) => {
                if (results.results.length > 0) {
                    return this.setState({ datas: results.results, total_pages: results.total_pages, loading: false }, () => {
                        window.scrollTo(0, 0);
                    });
                } else {
                    return this.props.history.push(`/tv/${this.props.match.params.type}/1`);
                }
            });
    };
    render() {
        const { datas, total_pages, loading, type } = this.state;
        let pageUrl = parseInt(this.props.match.params.page);
        return (
            <div className="displaytv">
                <form>
                    <select name="selectCat" id="selectCat" value={this.state.type} onChange={this.handleChange}>
                        <option value="popular">Popular</option>
                        <option value="top_rated">Top Rated</option>
                        <option value="on_the_air">On the Air</option>
                        <option value="airing_today">Airing Today</option>
                    </select>
                </form>
                {loading ? (
                    <SolarSystemLoading />
                ) : (
                    <div>
                        <DisplayTv datas={datas} />
                        {datas.length > 0 ? (
                            <ReactPaginate
                                onPageChange={this.handlePage}
                                pageCount={total_pages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                containerClassName={"pagination"}
                                hrefBuilder={(page) => `/tv/${type}/${page}`}
                                forcePage={pageUrl ? pageUrl - 1 : 0}
                            />
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
}

export default Tv;
