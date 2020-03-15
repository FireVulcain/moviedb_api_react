import React, { Component } from "react";

export default class PersonInfoSidebar extends Component {
    render() {
        const { datas } = this.props;
        return (
            <div>
                <h4>Personal Info</h4>
                <p>
                    <strong>Known for</strong>
                    {datas.known_for_department}
                </p>
                <p>
                    <strong>Gender</strong>
                    {datas.gender === 1 ? "Female" : "Male"}
                </p>
                <p>
                    <strong>Known Credits</strong>
                    {datas.movie_credits.cast.length + datas.tv_credits.cast.length}
                </p>
                <p>
                    <strong>Birthday</strong>
                    {datas.birthday}
                </p>
                <p>
                    <strong>Place of Birth</strong>
                    {datas.place_of_birth}
                </p>
                <p>
                    <strong>Official site</strong>
                    {datas.homepage ? (
                        <a href={datas.homepage} target="_blank" rel="noopener noreferrer">
                            {datas.homepage}
                        </a>
                    ) : (
                        "-"
                    )}
                </p>
                <strong>Also Known As</strong>
                <section id="knownAs">
                    <ul>
                        {datas.also_known_as.map((name, key) => {
                            return <li key={key}>{name}</li>;
                        })}
                    </ul>
                </section>
            </div>
        );
    }
}
