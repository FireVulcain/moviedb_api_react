import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import DisplayTrending from "../components/Trending/DisplayTrending";

class Trending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.match.params.type ? this.props.match.params.type : "movie",
            datas: [],
            error: "",
            loading: true,
            total_pages: 0,
            selectTimeFrame: this.props.match.params.timezone ? this.props.match.params.timezone : "day"
        };
    }

    componentDidMount = () => {
        let avaibleTypes = ["movie", "tv"];
        if (!avaibleTypes.includes(this.state.type)) return this.props.history.push(`/`);
        this.handlePage({ selected: this.props.match.params.page ? parseInt(this.props.match.params.page - 1) : 0 });
    };
    handleChange = (event, select) => {
        this.setState({ [select.name]: event.value }, () => {
            this.handlePage({ selected: 0 });
        });
    };
    handlePage = (pageNumber) => {
        let page = pageNumber.selected + 1;
        const { selectTimeFrame } = this.state;

        if (page > 1000) return (window.location.href = `/trending/${this.props.match.params.type}/${selectTimeFrame}/1`);

        this.props.history.push(`/trending/${this.state.type}/${selectTimeFrame}/${page}`);

        fetch(
            `https://api.themoviedb.org/3/trending/${this.state.type}/${selectTimeFrame}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&page=${page}`
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

    render() {
        const { loading, datas, total_pages, type, selectTimeFrame, error } = this.state;
        let pageUrl = parseInt(this.props.match.params.page);
        let chosenTimeWindow = selectTimeFrame === "day" ? { value: "day", label: "Daily" } : { value: "week", label: "Weekly" };

        return (
            <div className="dicoverContainer">
                {loading ? (
                    <SolarSystemLoading />
                ) : (
                    <div className="displayDiscover">
                        <div className="selectType">
                            <a href={`/trending/movie/${selectTimeFrame}/1`} className={this.props.match.params.type === "movie" ? "active" : null}>
                                Movies
                            </a>
                            <a href={`/trending/tv/${selectTimeFrame}/1`} className={this.props.match.params.type === "tv" ? "active" : null}>
                                Tv Shows
                            </a>
                        </div>
                        <form>
                            <Select
                                name="selectTimeFrame"
                                options={[
                                    { value: "day", label: "Daily" },
                                    { value: "week", label: "Weekly" }
                                ]}
                                defaultValue={chosenTimeWindow}
                                onChange={this.handleChange}
                                className="selectMultiple"
                                classNamePrefix="react-select"
                                placeholder="Filter by..."
                            />
                        </form>
                        <DisplayTrending datas={datas} type={type} error={error} />
                        {datas.length > 0 ? (
                            <ReactPaginate
                                onPageChange={this.handlePage}
                                pageCount={total_pages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                containerClassName={"pagination"}
                                hrefBuilder={(page) => `/trending/${type}/${selectTimeFrame}/${page}`}
                                forcePage={pageUrl ? pageUrl - 1 : 0}
                            />
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
}
export default Trending;
