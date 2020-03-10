import React, { Component } from "react";

export default class ListCrew extends Component {
    formatCrew = (array) => {
        let result = array.reduce((h, { job, id, name }) => {
            return Object.assign(h, { [name]: (h[name] || []).concat({ job, id, name }) });
        }, {});

        let finalArray = [];
        Object.entries(result).map((data) => {
            finalArray[data[0]] = [];
            return data[1].map((res) => {
                let avaibleJob = ["Director", "Story", "Screenplay"];
                if (avaibleJob.includes(res.job)) {
                    finalArray[res.name].push([res.job]);
                    finalArray[res.name].id = res.id;
                } else {
                    if (res.job === "Executive Producer") {
                        finalArray[res.name].push([res.job]);
                        finalArray[res.name].id = res.id;
                    }
                }
                return finalArray;
            });
        });
        for (var propName in finalArray) {
            if (finalArray[propName].length === 0) {
                delete finalArray[propName];
            }
        }
        return finalArray;
    };
    render() {
        const { crew, creator } = this.props;
        return (
            <div>
                {creator.length > 0 ? (
                    <div>
                        <h2>Created By</h2>
                        <ul className="listCrew">
                            {creator.map((data, key) => {
                                return (
                                    <li key={key}>
                                        <p className="crewName">
                                            <a href={`/person/${data.id}`}>{data.name}</a>
                                        </p>
                                        <p className="crewJob">Creator</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <div>
                        <h2>Featured Crew</h2>
                        <ul className="listCrew">
                            {Object.entries(this.formatCrew(crew)).map((data, key) => {
                                return (
                                    <li key={key}>
                                        <p className="crewName">
                                            <a href={`/person/${data[1].id}`}>{data[0]}</a>
                                        </p>
                                        <p className="crewJob">{data[1].toString()}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}
