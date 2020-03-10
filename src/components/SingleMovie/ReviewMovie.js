import React, { Component } from "react";

export default class ReviewMovie extends Component {
    textAbstract = (review, length) => {
        if (review.content.length <= length) {
            return <p className="reviewContent">{review.content}</p>;
        }
        let url = review.url;
        review = review.content.substring(0, length);
        return (
            <div>
                <p className="reviewContent">{review}...</p>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    Read More
                </a>
            </div>
        );
    };
    render() {
        const { reviews, pathName } = this.props;
        return (
            <section id="review">
                <h2>Last Review</h2>
                <div className="teaser">
                    <h3 className="reviewName">A review by {reviews.results[0].author}</h3>
                    {this.textAbstract(reviews.results[0], 500)}
                </div>

                <a href={pathName + "/reviews"}>Read all reviews</a>
            </section>
        );
    }
}
