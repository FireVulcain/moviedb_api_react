import React, { Component } from "react";
import Img404 from "./../assets/images/404.svg";
import Rocket from "./../assets/images/rocket.svg";
import Earth from "./../assets/images/earth.svg";
import Moon from "./../assets/images/moon.svg";
import Astronaut from "./../assets/images/astronaut.svg";

export default class NotFound extends Component {
    render() {
        return (
            <div className="stars">
                <div className="central-body">
                    <img className="image-404" src={Img404} width="300px" alt="404, Looks like you are lost in space" />
                    <a href="/" className="btn-go-home">
                        Go back home
                    </a>
                </div>
                <div className="objects">
                    <img className="object_rocket" src={Rocket} width="40px" alt="Rocket" />
                    <div className="earth-moon">
                        <img className="object_earth" src={Earth} width="100px" alt="Earth" />
                        <img className="object_moon" src={Moon} width="80px" alt="Moon" />
                    </div>
                    <div className="box_astronaut">
                        <img className="object_astronaut" src={Astronaut} width="140px" alt="Astronaut" />
                    </div>
                </div>
                <div className="glowing_stars">
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                </div>
            </div>
        );
    }
}
