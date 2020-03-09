import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";
import ReactPaginate from "react-paginate";

import Results from "../components/Search/Results";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            value: this.props.match.params.query ? this.props.match.params.query : "",
            datas: [],
            total_pages: 0,
            loading: false
        };
    }

    componentDidMount = () => {
        if (this.props.match.params.query) {
            this.props.match.params.page = this.props.match.params.page ? this.props.match.params.page : 1;
            this.handlePage({ selected: parseInt(this.props.match.params.page - 1) });
        }
    };

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.value === "") {
            return this.setState(
                {
                    error: null,
                    value: "",
                    datas: [],
                    total_pages: 0,
                    loading: false
                },
                () => {
                    this.props.history.push(`/search/`);
                }
            );
        } else {
            return this.setState({ loading: true }, () => {
                this.props.history.push(`/search/${this.state.value}/1`);
                this.handlePage({ selected: 0 });
            });
        }
    };

    handlePage = (data) => {
        let page = data.selected + 1;
        this.props.history.push(`/search/${this.state.value}/${page}`);
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${this.state.value}&page=${page}`)
            .then((res) => res.json())
            .then((results) => {
                if (results.errors) return this.setState({ error: "No film matches your request." });
                if (results.results.length > 0) {
                    return this.setState({ datas: results.results, total_pages: results.total_pages, loading: false }, () => {
                        window.scrollTo(0, 0);
                    });
                } else {
                    return this.setState({ error: "No film matches your request." });
                }
            });
    };
    render() {
        const { datas, error, total_pages, loading, value } = this.state;
        let pageUrl = this.props.match.params.page;
        return (
            <div>
                <form id="searchForm" onSubmit={this.handleSubmit}>
                    <input type="text" value={value} onChange={this.handleChange} placeholder="Search" />
                    <input type="submit" value="Search" />
                </form>

                {loading ? <SolarSystemLoading /> : <Results datas={datas} error={error} />}
                {datas.length > 0 ? (
                    <ReactPaginate
                        onPageChange={this.handlePage}
                        pageCount={total_pages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        containerClassName={"pagination"}
                        hrefBuilder={(page) => `/search/${value}/${page}`}
                        forcePage={pageUrl ? parseInt(pageUrl - 1) : 0}
                    />
                ) : null}
            </div>
        );
    }
}

export default Search;
