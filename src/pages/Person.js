import React, { Component } from "react";
import { SolarSystemLoading } from "react-loadingg";

/* components */
import MainInfos from "../components/Person/MainInfos";
import PersonInfoSidebar from "../components/Person/PersonInfoSidebar";

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: {},
            loading: true
        };
    }
    componentDidMount = () => {
        fetch(
            `https://api.themoviedb.org/3/person/${this.props.match.params.idPerson}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&append_to_response=movie_credits,tv_credits`
        )
            .then((res) => res.json())
            .then((results) => {
                if (Object.keys(results).length > 0) {
                    // console.log(results);
                    return this.setState({ datas: results, loading: false });
                }
            });
    };
    render() {
        const { datas, loading } = this.state;
        return (
            <div className="displayMovie">
                {loading ? (
                    <SolarSystemLoading />
                ) : (
                    <div className="container">
                        {datas.profile_path ? (
                            <img className="poster" src={`https://image.tmdb.org/t/p/w300${datas.profile_path}`} alt={datas.name} />
                        ) : (
                            <div className="no_image_holder poster"></div>
                        )}
                        <div className="wrapperInfoMovie">
                            <MainInfos datas={datas} />
                        </div>
                        <div className="additionalInfo">
                            <PersonInfoSidebar datas={datas} />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
export default Person;
