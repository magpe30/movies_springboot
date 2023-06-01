import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReviewForm from './ReviewForm';

import styled from "@emotion/styled";

const ReviewsContainer = styled.div`
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: start;
    margin-top: 35px;

    @media only screen and (max-width: 1100px) {
        margin: 35px 20px;
        flex-direction: column;
        align-items: start;
        top:20px;
    }
`;

const BackButton = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background: gold;
    font-weight: 600;
    position: absolute;
    color: black;
    padding: 10px 15px;
    top: 20px;
    left: 50px;

    &:hover{
        background: black;
        color: gold;
        border: 1px solid gold;
    }
`;

const ReviewHero = styled.div`
    height: 450px;
    background-color: black;
`;

const ImageCard = styled.div`
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), var(--img);
`

const ReviewsBlock = styled.div`

`;

const Review = styled.div`
    margin-bottom: 15px;
    border: 1px solid gold;
    border-radius: 5px;
    padding: 15px 25px;
`;

const Divider = styled.span`
    width: 1px;
    border-radius: 3px;
    height: 350px;
    background: gold;

    @media only screen and (max-width: 1100px) {
        width: 350px;
        height: 1px;
        margin: 40px 0;
    }
`


const Reviews = ({ getMovieDetails, movie, reviews, setReviews }) => {
    const [error, setError] = useState(null);
    const text = useRef();
    const params = useParams();
    const movieId = params.movieId;
    
    
    useEffect(() => {
        getMovieDetails(movieId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const sendReview = async(e) => {
        e.preventDefault();

        const rev = text.current;

        try {
            const response = await axios.post("http://localhost:8080/api/v1/reviews", {
                reviewBody: rev.value,
                imdbId: movieId,
            });
            const updatedReviews = [...reviews, {body:rev.value}];
            rev.value = "";
            setReviews(updatedReviews);
            console.log("reviews", reviews);
        } catch(err) {
            setError(err);
        }
    }
    
    return (
        <>
            <ReviewHero>
                <Link to={"/"}>
                    <BackButton>Back to movies</BackButton>
                </Link>
                <ImageCard style={{"--img": `url(${movie.backdrops?.[1]})`}} />
            </ReviewHero>
            <ReviewsContainer>
                <ReviewForm handleSubmit={sendReview} text={text} />
                {error && <p>Sorry... There was an error and your review was not submitted. Please try again.</p>}
                <Divider />
                <ReviewsBlock>
                    <h2>Reviews</h2>
                    {
                        reviews?.map((rev, index) => {
                            return (
                                <Review key={index}>{rev?.body}</Review>
                            )
                        })
                    }
                </ReviewsBlock>
            </ReviewsContainer>
        </>
    )
};

export default Reviews;
