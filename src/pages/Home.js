import React, { Component } from "react";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            value: "",
            datas: [],
            total_page: 0
        };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };
    handleSubmit = (e) => {
        e.preventDefault();

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${this.state.value}`)
            .then((res) => res.json())
            .then((results) => {
                if (results.total_results > 0) {
                    return this.setState({ datas: results.results });
                } else {
                    return this.setState({ error: "Aucun résultat" });
                }
            });
    };
    render() {
        const { datas, error } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Recherche :
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Envoyer" />
                </form>
                <div className="listData">
                    {datas.length > 0 ? (
                        datas
                            .sort((a, b) => (a.release_date > b.release_date ? -1 : 1))
                            .map((data, key) => {
                                return (
                                    <div key={key}>
                                        <a href={data.id}>
                                            {data.poster_path ? (
                                                <img src={"https://image.tmdb.org/t/p/w300/" + data.poster_path} alt={data.title} />
                                            ) : (
                                                <div className="no_image_holder"></div>
                                            )}

                                            <p>{data.title}</p>
                                        </a>
                                    </div>
                                );
                            })
                    ) : (
                        <div>{error}</div>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
