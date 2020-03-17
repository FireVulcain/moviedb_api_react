import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PersonTvCast from "./PersonTvCast";
import PersonMoviesCast from "./PersonMoviesCast";

export default class MainInfos extends Component {
    render() {
        const { datas } = this.props;
        let defaultIndex = datas.movie_credits.cast.length > 0 ? 0 : 1;
        let disabledMovie = datas.movie_credits.cast.length > 0 ? false : true;
        let disabledTv = datas.tv_credits.cast.length > 0 ? false : true;
        return (
            <div>
                <h1>{datas.name}</h1>
                <h2>Biography</h2>
                <p className="synopsis">{datas.biography}</p>
                <div>
                    <h2>Acting</h2>
                    <Tabs defaultIndex={defaultIndex}>
                        <TabList>
                            <Tab disabled={disabledMovie}>Movies</Tab>
                            <Tab disabled={disabledTv}>Tv Shows</Tab>
                        </TabList>

                        <TabPanel>
                            <PersonMoviesCast datas={datas.movie_credits.cast} />
                        </TabPanel>
                        <TabPanel>
                            <PersonTvCast datas={datas.tv_credits.cast} />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}
