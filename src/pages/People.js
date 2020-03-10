import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";
import ReactPaginate from "react-paginate";
import DisplayPeople from "../components/People/DisplayPeople";
class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            loading: true,
            total_pages: 0
        };
    }
    componentDidMount = () => {
        this.handlePage({ selected: this.props.match.params.page ? parseInt(this.props.match.params.page - 1) : 0 });
    };
    handlePage = (pageNumber) => {
        let page = pageNumber.selected + 1;
        if (page > 500) return (window.location.href = `/people/1`);

        fetch(`https://api.themoviedb.org/3/person/popular/?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&region=US&page=${page}`)
            .then((res) => res.json())
            .then((results) => {
                if (results.results.length > 0) {
                    return this.setState({ datas: results.results, total_pages: results.total_pages, loading: false }, () => {
                        window.scrollTo(0, 0);
                    });
                } else {
                    return this.props.history.push(`/person/1`);
                }
            });
    };
    render() {
        const { datas, total_pages, loading } = this.state;
        let pageUrl = parseInt(this.props.match.params.page);
        return (
            <div className="displayPeople">
                {loading ? (
                    <SolarSystemLoading />
                ) : (
                    <div>
                        <DisplayPeople datas={datas} />
                        {datas.length > 0 ? (
                            <ReactPaginate
                                onPageChange={this.handlePage}
                                pageCount={total_pages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                containerClassName={"pagination"}
                                hrefBuilder={(page) => `/people/${page}`}
                                initialPage={pageUrl ? pageUrl - 1 : 0}
                                forcePage={pageUrl ? pageUrl - 1 : 0}
                            />
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
}

export default People;
