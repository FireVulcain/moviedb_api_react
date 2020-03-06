import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";

import Results from "../components/Search/Results";

const INIT_STATE = {
    error: null,
    value: "",
    datas: [],
    total_pages: 0,
    page: 0,
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
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${this.state.value}`)
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
    paginate = (total_pages, page) => {
        const items = [];

        for (let i = 1; i <= total_pages; i++) {
            if (page === i) {
                items.push(<div key={i}>{i}</div>);
            } else {
                items.push(
                    <div data-id={i} key={i} onClick={this.handlePage}>
                        {i}
                    </div>
                );
            }
        }
        return items;
    };

    handlePage = (e) => {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${this.state.value}&page=${e.currentTarget.dataset.id}`
        )
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
        const { datas, error, total_pages, page, loading } = this.state;
        return (
            <div>
                <form id="searchForm" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search" />
                    <input type="submit" value="Search" />
                </form>

                {loading ? <SolarSystemLoading /> : <Results datas={datas} error={error} />}

                <div className="pagination">{this.paginate(total_pages, page)}</div>
            </div>
        );
    }
}

export default Search;
