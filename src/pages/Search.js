import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";
import ReactPaginate from "react-paginate";

import Results from "../components/Search/Results";

const INIT_STATE = {
    error: null,
    value: "",
    datas: [],
    total_pages: 0,
    page: 1,
    loading: false
};
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INIT_STATE
        };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.value === "") {
            this.setState({ ...INIT_STATE });
        } else {
            this.setState({ loading: true });
            fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${this.state.value}`)
                .then((res) => res.json())
                .then((results) => {
                    console.log(results);
                    if (results.total_results > 0) {
                        return this.setState({ datas: results.results, total_pages: results.total_pages, page: results.page });
                    } else {
                        return this.setState({ error: "Aucun résultat" });
                    }
                })
                .then(() => {
                    this.setState({ loading: false });
                });
        }
    };

    handlePage = (data) => {
        let page = data.selected + 1;
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${this.state.value}&page=${page}`)
            .then((res) => res.json())
            .then((results) => {
                if (results.total_results > 0) {
                    return this.setState({ datas: results.results, total_pages: results.total_pages, page: results.page }, () => {
                        window.scrollTo(0, 0);
                    });
                } else {
                    return this.setState({ error: "Aucun résultat" });
                }
            });
    };
    render() {
        const { datas, error, total_pages, loading } = this.state;
        return (
            <div>
                <form id="searchForm" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search" />
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
                    />
                ) : null}
            </div>
        );
    }
}

export default Search;
